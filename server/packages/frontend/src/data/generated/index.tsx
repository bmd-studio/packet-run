/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  asn?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  ip: Scalars['String']['output'];
  operator?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Hop = {
  __typename?: 'Hop';
  address: Address;
  createdAt: Scalars['DateTime']['output'];
  hop: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  run: Run;
  terminal: Terminal;
  updatedAt: Scalars['DateTime']['output'];
};

export type Presence = {
  __typename?: 'Presence';
  connectedAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  ip: Scalars['String']['output'];
  lastSeenAt: Scalars['DateTime']['output'];
  terminal: Terminal;
  websocketId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  terminal?: Maybe<Terminal>;
  terminals: Array<Terminal>;
};


export type QueryTerminalArgs = {
  id: Scalars['Float']['input'];
};

export type Run = {
  __typename?: 'Run';
  createdAt: Scalars['DateTime']['output'];
  destination: Address;
  hops: Array<Address>;
  id: Scalars['String']['output'];
  nfcId?: Maybe<Scalars['String']['output']>;
  route: Hop;
  terminal?: Maybe<Terminal>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  allTerminals: Array<Terminal>;
  registerTerminal?: Maybe<Terminal>;
};


export type SubscriptionRegisterTerminalArgs = {
  id: Scalars['Float']['input'];
};

export type Terminal = {
  __typename?: 'Terminal';
  connectionsFrom: Array<Terminal>;
  connectionsTo: Array<Terminal>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  payload?: Maybe<Scalars['String']['output']>;
  presences: Array<Presence>;
  run?: Maybe<Run>;
  status: TerminalStatus;
  type: TerminalType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum TerminalStatus {
  CreatedPacket = 'CREATED_PACKET',
  CreatingPacket = 'CREATING_PACKET',
  Idle = 'IDLE',
  Offline = 'OFFLINE',
  ScanningNfc = 'SCANNING_NFC'
}

export enum TerminalType {
  Gateway = 'GATEWAY',
  Receiver = 'RECEIVER',
  Router = 'ROUTER',
  Sender = 'SENDER',
  Server = 'SERVER'
}

export type AllTerminalsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AllTerminalsSubscription = { __typename?: 'Subscription', allTerminals: Array<{ __typename?: 'Terminal', id: number, type: TerminalType, status: TerminalStatus, payload?: string | null, createdAt: any, updatedAt: any, connectionsTo: Array<{ __typename?: 'Terminal', id: number }>, run?: { __typename?: 'Run', id: string, nfcId?: string | null, url: string, createdAt: any, updatedAt: any, destination: { __typename?: 'Address', ip: string, operator?: string | null }, hops: Array<{ __typename?: 'Address', ip: string }>, route: { __typename?: 'Hop', id: number, address: { __typename?: 'Address', ip: string }, terminal: { __typename?: 'Terminal', id: number } } } | null, presences: Array<{ __typename?: 'Presence', id: number, ip: string, websocketId: string, connectedAt: any, lastSeenAt: any }> }> };


export const AllTerminalsDocument = gql`
    subscription AllTerminals {
  allTerminals {
    id
    type
    status
    payload
    connectionsTo {
      id
    }
    run {
      id
      nfcId
      url
      destination {
        ip
        operator
      }
      hops {
        ip
      }
      route {
        id
        address {
          ip
        }
        terminal {
          id
        }
      }
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    presences {
      id
      ip
      websocketId
      connectedAt
      lastSeenAt
    }
  }
}
    `;

/**
 * __useAllTerminalsSubscription__
 *
 * To run a query within a React component, call `useAllTerminalsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAllTerminalsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTerminalsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useAllTerminalsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<AllTerminalsSubscription, AllTerminalsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AllTerminalsSubscription, AllTerminalsSubscriptionVariables>(AllTerminalsDocument, options);
      }
export type AllTerminalsSubscriptionHookResult = ReturnType<typeof useAllTerminalsSubscription>;
export type AllTerminalsSubscriptionResult = Apollo.SubscriptionResult<AllTerminalsSubscription>;