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
  createdAt: Scalars['DateTime']['output'];
  info?: Maybe<IpInfo>;
  ip: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Carrier = {
  __typename?: 'Carrier';
  mcc?: Maybe<Scalars['String']['output']>;
  mnc?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Company = {
  __typename?: 'Company';
  domain: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Connection = {
  __typename?: 'Connection';
  asn: Scalars['Float']['output'];
  domain: Scalars['String']['output'];
  organization: Scalars['String']['output'];
  route: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ContinentOrRegion = {
  __typename?: 'ContinentOrRegion';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Country = {
  __typename?: 'Country';
  area: Scalars['Float']['output'];
  borders: Array<Scalars['String']['output']>;
  calling_code: Scalars['String']['output'];
  capital: Scalars['String']['output'];
  code: Scalars['String']['output'];
  flag: Flag;
  languages?: Maybe<Array<LanguagesEntityOrLanguage>>;
  name: Scalars['String']['output'];
  population: Scalars['Float']['output'];
  population_density: Scalars['Float']['output'];
  tld: Scalars['String']['output'];
};

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String']['output'];
  format: Format;
  name: Scalars['String']['output'];
  name_native: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  plural_native: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  symbol_native: Scalars['String']['output'];
};

export type Flag = {
  __typename?: 'Flag';
  emoji: Scalars['String']['output'];
  emoji_unicode: Scalars['String']['output'];
  emojitwo: Scalars['String']['output'];
  noto: Scalars['String']['output'];
  twemoji: Scalars['String']['output'];
  wikimedia: Scalars['String']['output'];
};

export type Format = {
  __typename?: 'Format';
  negative: NegativeOrPositive;
  positive: NegativeOrPositive;
};

export type IpInfo = {
  __typename?: 'IpInfo';
  carrier: Carrier;
  company: Company;
  connection: Connection;
  currency: Currency;
  hostname?: Maybe<Scalars['String']['output']>;
  ip: Scalars['String']['output'];
  location: Location;
  security: Security;
  time_zone: TimeZone;
  type: Scalars['String']['output'];
};

export type Job = {
  __typename?: 'Job';
  attemptsMade: Scalars['Float']['output'];
  data: Scalars['String']['output'];
  failedReason?: Maybe<Scalars['String']['output']>;
  finishedOn?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  processedOn?: Maybe<Scalars['Float']['output']>;
  stacktrace?: Maybe<Array<Scalars['String']['output']>>;
  timestamp: Scalars['Float']['output'];
};

export type LanguagesEntityOrLanguage = {
  __typename?: 'LanguagesEntityOrLanguage';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  native: Scalars['String']['output'];
};

export type Location = {
  __typename?: 'Location';
  city: Scalars['String']['output'];
  continent: ContinentOrRegion;
  country: Country;
  in_eu: Scalars['Boolean']['output'];
  language: LanguagesEntityOrLanguage;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  postal: Scalars['String']['output'];
  region: ContinentOrRegion;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Used for `SENDER` and `SERVER` terminal types. These terminals may transform a packet using a particular interaction. Depending on `isPacketCreated`, this should result in the terminal status being set to `CREATING_PACKET` or `CREATED_PACKET` */
  createReturnPacketForTerminal?: Maybe<Scalars['Boolean']['output']>;
  createRun: Run;
  /** Indicate that a particular terminal has scanned an NFC tag. This should result in the terminal status being set to `SCANNING_NFC` */
  scanNfcForTerminal?: Maybe<Scalars['Boolean']['output']>;
  /** Restore a particular terminal to the `IDLE` status */
  setTerminalToIdle?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateReturnPacketForTerminalArgs = {
  isPacketCreated: Scalars['Boolean']['input'];
  terminalId: Scalars['Float']['input'];
};


export type MutationCreateRunArgs = {
  nfcId: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type MutationScanNfcForTerminalArgs = {
  nfcId: Scalars['String']['input'];
  terminalId: Scalars['Float']['input'];
};


export type MutationSetTerminalToIdleArgs = {
  terminalId: Scalars['Float']['input'];
};

export type NegativeOrPositive = {
  __typename?: 'NegativeOrPositive';
  prefix: Scalars['String']['output'];
  suffix: Scalars['String']['output'];
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
  run: Run;
  terminal?: Maybe<Terminal>;
  terminals: Array<Terminal>;
};


export type QueryRunArgs = {
  id: Scalars['String']['input'];
};


export type QueryTerminalArgs = {
  id: Scalars['Float']['input'];
};

export type Run = {
  __typename?: 'Run';
  createdAt: Scalars['DateTime']['output'];
  /** The index of the RunHop where the run is currently at */
  currentHopIndex: Scalars['Float']['output'];
  destination: Address;
  /** The hops that have been identified for this route in the context of the installation. */
  hops: Array<RunHop>;
  id: Scalars['String']['output'];
  imagePath?: Maybe<Scalars['String']['output']>;
  nfcId?: Maybe<Scalars['String']['output']>;
  terminal?: Maybe<Terminal>;
  /**
   * The internet hops a packet would actually take when transmitted in real life. NOTE: Look at the `hops` field if you want the hops that pertain specifically to the installation
   * @deprecated You shouldn't need this field on the front-end. Please use `hops` instead.
   */
  tracerouteHops: Array<TracerouteHop>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

/** This describes an hop in the context of the installation. It is either a previous hop that has been taken by the user, or it is an option for the user in the future. */
export type RunHop = {
  __typename?: 'RunHop';
  address: Address;
  createdAt: Scalars['DateTime']['output'];
  hop: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  run: Run;
  status: RunHopStatus;
  terminal: Terminal;
  type: RunHopType;
  updatedAt: Scalars['DateTime']['output'];
};

/** Describes the current status of this hop: has it already been taken or merely been suggested... */
export enum RunHopStatus {
  /** The hop was actually taken by a user action */
  Actual = 'ACTUAL',
  /** The hop is potential option for the user to take */
  Potential = 'POTENTIAL'
}

/** Describes the label that is attached to the hop */
export enum RunHopType {
  /** The hop is taken as an alternative to an advised hop */
  Alternative = 'ALTERNATIVE',
  Invalid = 'INVALID',
  /** The hop takes the user backwards to a previously visited hop */
  Previous = 'PREVIOUS',
  /** The hop takes the user in the recommended direction */
  Recommended = 'RECOMMENDED',
  Wormhole = 'WORMHOLE'
}

export type Security = {
  __typename?: 'Security';
  is_abuser: Scalars['Boolean']['output'];
  is_anonymous: Scalars['Boolean']['output'];
  is_attacker: Scalars['Boolean']['output'];
  is_bogon: Scalars['Boolean']['output'];
  is_cloud_provider: Scalars['Boolean']['output'];
  is_proxy: Scalars['Boolean']['output'];
  is_relay: Scalars['Boolean']['output'];
  is_threat: Scalars['Boolean']['output'];
  is_tor: Scalars['Boolean']['output'];
  is_tor_exit: Scalars['Boolean']['output'];
  is_vpn: Scalars['Boolean']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  allTerminals: Array<Terminal>;
  jobs: Array<Job>;
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
  /** A packet has been transformed, but is still actively being scanned */
  CreatedPacket = 'CREATED_PACKET',
  /** A packet is actively being created or transformed on the terminal */
  CreatingPacket = 'CREATING_PACKET',
  /** The terminal is active and operational, but not currently in use by a user */
  Idle = 'IDLE',
  /** The terminal has failed its heartbeats and is considered offline */
  Offline = 'OFFLINE',
  /** A packet is currently being scanned using the NFC reader */
  ScanningNfc = 'SCANNING_NFC'
}

export enum TerminalType {
  /** A special type of router that bridges a `sender` and an internet of `router`s */
  Gateway = 'GATEWAY',
  /** Receives a response and displays it on a connected screen */
  Receiver = 'RECEIVER',
  /** A distributor of packets across the internet */
  Router = 'ROUTER',
  /** Creates a request and dispatches it to an `gateway` */
  Sender = 'SENDER',
  /** Receives a request, transforms it into a response */
  Server = 'SERVER'
}

export type TimeZone = {
  __typename?: 'TimeZone';
  abbreviation: Scalars['String']['output'];
  current_time: Scalars['String']['output'];
  id: Scalars['String']['output'];
  in_daylight_saving: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  offset: Scalars['Float']['output'];
};

/** This describes a hop that was retrieved by running traceroute to the destionation. It is an existing hop that would ahve been taken were the packet routed over the internet. */
export type TracerouteHop = {
  __typename?: 'TracerouteHop';
  address: Address;
  createdAt: Scalars['DateTime']['output'];
  hop: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  run: Run;
  updatedAt: Scalars['DateTime']['output'];
};

export type AllTerminalsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AllTerminalsSubscription = { __typename?: 'Subscription', allTerminals: Array<{ __typename?: 'Terminal', id: number, type: TerminalType, status: TerminalStatus, payload?: string | null, createdAt: any, updatedAt: any, connectionsTo: Array<{ __typename?: 'Terminal', id: number }>, run?: { __typename?: 'Run', id: string, nfcId?: string | null, url: string, currentHopIndex: number, createdAt: any, updatedAt: any, destination: { __typename?: 'Address', ip: string, info?: { __typename?: 'IpInfo', company: { __typename?: 'Company', name: string } } | null }, hops: Array<{ __typename?: 'RunHop', id: number, status: RunHopStatus, type: RunHopType, address: { __typename?: 'Address', ip: string }, terminal: { __typename?: 'Terminal', id: number } }> } | null, presences: Array<{ __typename?: 'Presence', id: number, ip: string, websocketId: string, connectedAt: any, lastSeenAt: any }> }> };

export type JobsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type JobsSubscription = { __typename?: 'Subscription', jobs: Array<{ __typename?: 'Job', name: string, id?: string | null, attemptsMade: number, processedOn?: number | null, finishedOn?: number | null, timestamp: number, data: string, failedReason?: string | null, stacktrace?: Array<string> | null }> };

export type RegisterTerminalSubscriptionVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type RegisterTerminalSubscription = { __typename?: 'Subscription', registerTerminal?: { __typename?: 'Terminal', id: number, type: TerminalType, status: TerminalStatus, payload?: string | null, createdAt: any, updatedAt: any } | null };


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
        info {
          company {
            name
          }
        }
      }
      hops {
        id
        address {
          ip
        }
        terminal {
          id
        }
        status
        type
      }
      currentHopIndex
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
export const JobsDocument = gql`
    subscription Jobs {
  jobs {
    name
    id
    attemptsMade
    processedOn
    finishedOn
    timestamp
    data
    failedReason
    stacktrace
  }
}
    `;

/**
 * __useJobsSubscription__
 *
 * To run a query within a React component, call `useJobsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useJobsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useJobsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<JobsSubscription, JobsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<JobsSubscription, JobsSubscriptionVariables>(JobsDocument, options);
      }
export type JobsSubscriptionHookResult = ReturnType<typeof useJobsSubscription>;
export type JobsSubscriptionResult = Apollo.SubscriptionResult<JobsSubscription>;
export const RegisterTerminalDocument = gql`
    subscription RegisterTerminal($id: Float!) {
  registerTerminal(id: $id) {
    id
    type
    status
    payload
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useRegisterTerminalSubscription__
 *
 * To run a query within a React component, call `useRegisterTerminalSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRegisterTerminalSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegisterTerminalSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRegisterTerminalSubscription(baseOptions: Apollo.SubscriptionHookOptions<RegisterTerminalSubscription, RegisterTerminalSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RegisterTerminalSubscription, RegisterTerminalSubscriptionVariables>(RegisterTerminalDocument, options);
      }
export type RegisterTerminalSubscriptionHookResult = ReturnType<typeof useRegisterTerminalSubscription>;
export type RegisterTerminalSubscriptionResult = Apollo.SubscriptionResult<RegisterTerminalSubscription>;