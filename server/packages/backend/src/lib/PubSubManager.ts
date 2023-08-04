import { AnyEntity, Loaded } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

/**
 * This class manages publishers and subscriptions. It contains methods for
 * publishing and subscribing to specific entity-based channels.
 */
@Injectable()
export default class PubSubManager {
    /** A registry of BehaviourSubjects, keyed by an identified entity and event
     * name*/
    private readonly observables = new Map<string, BehaviorSubject<unknown>>;

    /** A registry of weboscketIds that are subscribed to a particular
     * BehaviourSubject, keyed by an identified entity  */
    private readonly subscriptions = new Map<string, Set<string>>;

    /** A registry of event names that are subscribed to keyed by identified entities  */
    private readonly events = new Map<string, Set<string>>;
    
    private getKeyBase(entity: AnyEntity, id: string | number) {
        return `${entity.name}_${id}`;
    }

    /**
     * Calculate the key that is used to subscribe or publish for this specificy
     * entity instance.
     */
    private getKey(entity: AnyEntity, id: string | number, eventName) {
        return `${this.getKeyBase(entity, id)}_${eventName}`;
    }

    /**
     * Since all observables are scoped by event names, retrieve all keys that
     * can possibly associated with an identifiy entity.
     */
    private getEventsForEntity(entity: new (...args: any[]) => AnyEntity, id: string | number) {
        const baseKey = this.getKeyBase(entity, id);
        return Array.from(this.events.get(baseKey) || []).map((eventName) => [eventName, `${baseKey}_${eventName}`]);
    }

    /**
     * Publish a new value for a particular entity
     */
    publish<T = AnyEntity>(entity: new (...args: any[]) => T, id: string | number, data: T): void {
        console.log(this.events);
        this.getEventsForEntity(entity, id).forEach(([eventName, observableKey]) => {
            // GUARD: Check whether an observable already exists for this key
            if (this.observables.has(observableKey)) {
                // If it does, simply update it with the next value
                this.observables.get(observableKey).next({ [eventName]: data });
            } else {
                // For now: don't create observables if they don't exist, wait for
                // them to be initialised by a subscriber first.
                return;
    
                // If it doesn't, create the observable based on the supplied value
                const subject = new BehaviorSubject(data);
    
                // Then store the observable in the registry
                this.observables.set(eventName, subject);
            }
        });
    }

    /**
     * Subscribe to the updates for a particular entity instance
     */
    async subscribe<T = AnyEntity>(
        /** The entitty type in question */
        entity: new (...args: any[]) => T,
        /** The primary key for this entity instance */
        id: string | number, 
        /** A function that retrieves the value for this instance if it doesn't
         * already exists in the registry */
        retriever: () => Promise<T> | T | Promise<Loaded<T>> | null | Promise<null>,
        /** The websocket id (key) for the client subscribing to the value.
         * Retrieve this in your resolver using the @WebsocketId decorator. */
        websocketId: string,
        /** The event name this subscription should be associated with. This
         * MUST match the function name you are calling this function from. */
        eventName: string,
    ): Promise<BehaviorSubject<{ [key: string] : T }> | null> {
        const baseKey = this.getKeyBase(entity, id);
        const key = this.getKey(entity, id, eventName);

        // Register the subscription first
        if (this.subscriptions.has(key)) {
            this.subscriptions.get(key).add(websocketId);
        } else {
            this.subscriptions.set(key, new Set([websocketId]));
        }

        // Then, register the event name if it hasn't been already
        if (this.events.has(baseKey)) {
            if (!this.events.get(baseKey).has(eventName)) {
                this.events.get(baseKey).add(eventName);
            }
        } else {
            this.events.set(baseKey, new Set([eventName]));
        }

        // GUARD: Check whether an observable already exists for this particular entity
        if (this.observables.has(key)) {
            // If it does, return it
            return this.observables.get(key) as BehaviorSubject<{ [key: string]: T }>;
        } else {
            // If it doesn't retrieve the value for this entity
            const value = await retriever();

            // Then, pack the value in an observable
            const subject = new BehaviorSubject({ [eventName]: value });
            
            // Store the observable in the registry
            this.observables.set(key, subject);

            // And return the observable
            return subject;
        }
    }

    /**
     * Handle a single disconnect from a single client.
     */
    async disconnect(websocketId: string) {
        // Loop through all active subscriptions
        this.subscriptions.forEach((clients, key) => {
            // GUARD: If the disconnected client wasn't subscribed to this
            // entity, skip this subscription.
            if (!clients.has(websocketId)) {
                return;
            }

            // GUARD: If they were, check whether there are any remaning
            // subscriptions after this one is eliminated
            if (clients.size > 1) {
                // If there would be, just remove this client id from the subscription
                clients.delete(websocketId);
            } else {
                // If there wouldn't be any subscriptions left, nuke both the
                // subscription and the BehaviourSubject.
                this.subscriptions.delete(key);
                this.observables.delete(key);
            }
        });
    }
}