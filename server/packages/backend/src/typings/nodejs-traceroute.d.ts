declare module "nodejs-traceroute" {
    import { Hop } from 'nodejs-traceroute/lib/process';

    type TracerouteEventTypes = {
        pid: [pid: number],
        destination: [destination: string],
        hop: [hop: Hop],
        close: [exitCode: number],
    };

    export default class Traceroute{
        constructor(ipVersion?: string, sendwait?: number);
        parseDestination(data: string): string | null;
        parseHop(hopData: string): Hop | null;
        on<T extends keyof TracerouteEventTypes>(
            eventName: T,
            handler: (...args: TracerouteEventTypes[T])=> void,
        ): this;
        off<T extends keyof TracerouteEventTypes>(
            eventName: T,
            handler: (...args: TracerouteEventTypes[T])=> void,
        ): this;
        trace(domainName: string): void;
    }
}