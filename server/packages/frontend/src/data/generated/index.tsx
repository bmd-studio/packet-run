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

export type Hop = {
  __typename?: 'Hop';
  address?: Maybe<Address>;
  createdAt: Scalars['DateTime']['output'];
  hop: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  run: Run;
  updatedAt: Scalars['DateTime']['output'];
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
  finishedOn?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  processedOn?: Maybe<Scalars['Float']['output']>;
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
  createRun: Run;
};


export type MutationCreateRunArgs = {
  nfcId: Scalars['String']['input'];
  url: Scalars['String']['input'];
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
  destination: Address;
  hops: Array<Address>;
  id: Scalars['String']['output'];
  imagePath?: Maybe<Scalars['String']['output']>;
  nfcId?: Maybe<Scalars['String']['output']>;
  route: Array<Hop>;
  terminal?: Maybe<Terminal>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

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

export type TimeZone = {
  __typename?: 'TimeZone';
  abbreviation: Scalars['String']['output'];
  current_time: Scalars['String']['output'];
  id: Scalars['String']['output'];
  in_daylight_saving: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  offset: Scalars['Float']['output'];
};

export type AllTerminalsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AllTerminalsSubscription = { __typename?: 'Subscription', allTerminals: Array<{ __typename?: 'Terminal', id: number, type: TerminalType, status: TerminalStatus, payload?: string | null, createdAt: any, updatedAt: any, connectionsTo: Array<{ __typename?: 'Terminal', id: number }>, run?: { __typename?: 'Run', id: string, nfcId?: string | null, url: string, createdAt: any, updatedAt: any, destination: { __typename?: 'Address', ip: string, info?: { __typename?: 'IpInfo', company: { __typename?: 'Company', name: string } } | null }, hops: Array<{ __typename?: 'Address', ip: string }>, route: Array<{ __typename?: 'Hop', id: number, address?: { __typename?: 'Address', ip: string } | null }> } | null, presences: Array<{ __typename?: 'Presence', id: number, ip: string, websocketId: string, connectedAt: any, lastSeenAt: any }> }> };


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
        ip
      }
      route {
        id
        address {
          ip
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