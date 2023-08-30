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
  isInAltNetwork: Scalars['Boolean']['output'];
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
  domain?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Connection = {
  __typename?: 'Connection';
  asn?: Maybe<Scalars['Float']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Scalars['String']['output']>;
  route?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ContinentOrRegion = {
  __typename?: 'ContinentOrRegion';
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Country = {
  __typename?: 'Country';
  area: Scalars['Float']['output'];
  borders: Array<Scalars['String']['output']>;
  calling_code?: Maybe<Scalars['String']['output']>;
  capital?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  flag: Flag;
  languages?: Maybe<Array<LanguagesEntityOrLanguage>>;
  name?: Maybe<Scalars['String']['output']>;
  population?: Maybe<Scalars['Float']['output']>;
  population_density?: Maybe<Scalars['Float']['output']>;
  tld?: Maybe<Scalars['String']['output']>;
};

export type Currency = {
  __typename?: 'Currency';
  code?: Maybe<Scalars['String']['output']>;
  format: Format;
  name?: Maybe<Scalars['String']['output']>;
  name_native?: Maybe<Scalars['String']['output']>;
  plural?: Maybe<Scalars['String']['output']>;
  plural_native?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  symbol_native?: Maybe<Scalars['String']['output']>;
};

export type Flag = {
  __typename?: 'Flag';
  emoji?: Maybe<Scalars['String']['output']>;
  emoji_unicode?: Maybe<Scalars['String']['output']>;
  emojitwo?: Maybe<Scalars['String']['output']>;
  noto?: Maybe<Scalars['String']['output']>;
  twemoji?: Maybe<Scalars['String']['output']>;
  wikimedia?: Maybe<Scalars['String']['output']>;
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
  attemptsMade?: Maybe<Scalars['Float']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  failedReason?: Maybe<Scalars['String']['output']>;
  finishedOn?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  processedOn?: Maybe<Scalars['Float']['output']>;
  stacktrace?: Maybe<Array<Scalars['String']['output']>>;
  status: JobStatus;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

export enum JobStatus {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Delayed = 'DELAYED',
  Failed = 'FAILED',
  Other = 'OTHER',
  Waiting = 'WAITING'
}

export type LanguagesEntityOrLanguage = {
  __typename?: 'LanguagesEntityOrLanguage';
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  native?: Maybe<Scalars['String']['output']>;
};

export type Location = {
  __typename?: 'Location';
  city?: Maybe<Scalars['String']['output']>;
  continent: ContinentOrRegion;
  country: Country;
  in_eu: Scalars['Boolean']['output'];
  language: LanguagesEntityOrLanguage;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  postal?: Maybe<Scalars['String']['output']>;
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
  prefix?: Maybe<Scalars['String']['output']>;
  suffix?: Maybe<Scalars['String']['output']>;
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
  availableHops: Array<RunHop>;
  createdAt: Scalars['DateTime']['output'];
  currentHop: RunHop;
  /** The index of the RunHop where the run is currently at */
  currentHopIndex: Scalars['Float']['output'];
  destination?: Maybe<Address>;
  /** The hops that have been identified for this route in the context of the installation. */
  hops: Array<RunHop>;
  id: Scalars['String']['output'];
  imagePath?: Maybe<Scalars['String']['output']>;
  isTracerouteFinished: Scalars['Boolean']['output'];
  nfcId?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<Address>;
  packetType: RunPacketType;
  server: Terminal;
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
  address?: Maybe<Address>;
  createdAt: Scalars['DateTime']['output'];
  hop: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  mayPerformTransformation: Scalars['Boolean']['output'];
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

export enum RunPacketType {
  Request = 'REQUEST',
  Response = 'RESPONSE'
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
  connectionsFrom: Array<TerminalConnection>;
  connectionsTo: Array<TerminalConnection>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  payload?: Maybe<Scalars['String']['output']>;
  presences: Array<Presence>;
  run?: Maybe<Run>;
  status: TerminalStatus;
  type: TerminalType;
  updatedAt: Scalars['DateTime']['output'];
};

export type TerminalConnection = {
  __typename?: 'TerminalConnection';
  from: Terminal;
  slot: Scalars['Float']['output'];
  to: Terminal;
};

export enum TerminalStatus {
  /** A packet has been transformed, but is still actively being scanned */
  CreatedPacket = 'CREATED_PACKET',
  /** A packet is actively being created or transformed on the terminal */
  CreatingPacket = 'CREATING_PACKET',
  /** The terminal is active and operational, but not currently in use by a user */
  Idle = 'IDLE',
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
  abbreviation?: Maybe<Scalars['String']['output']>;
  current_time?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  in_daylight_saving: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
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

export type CreateRunMutationVariables = Exact<{
  url: Scalars['String']['input'];
  nfcId: Scalars['String']['input'];
}>;


export type CreateRunMutation = { __typename?: 'Mutation', createRun: { __typename?: 'Run', id: string, nfcId?: string | null, url: string, createdAt: any, updatedAt: any, imagePath?: string | null } };

export type ResetTerminalMutationVariables = Exact<{
  terminalId: Scalars['Float']['input'];
}>;


export type ResetTerminalMutation = { __typename?: 'Mutation', setTerminalToIdle?: boolean | null };

export type ScanNfcForTerminalMutationVariables = Exact<{
  terminalId: Scalars['Float']['input'];
  nfcId: Scalars['String']['input'];
}>;


export type ScanNfcForTerminalMutation = { __typename?: 'Mutation', scanNfcForTerminal?: boolean | null };

export type GetTerminalTypeQueryVariables = Exact<{
  terminalId: Scalars['Float']['input'];
}>;


export type GetTerminalTypeQuery = { __typename?: 'Query', terminal?: { __typename?: 'Terminal', id: number, type: TerminalType } | null };

export type AllTerminalsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AllTerminalsSubscription = { __typename?: 'Subscription', allTerminals: Array<{ __typename?: 'Terminal', id: number, type: TerminalType, status: TerminalStatus, payload?: string | null, createdAt: any, updatedAt: any, connectionsTo: Array<{ __typename?: 'TerminalConnection', slot: number, to: { __typename?: 'Terminal', id: number } }>, run?: { __typename?: 'Run', id: string, nfcId?: string | null, url: string, currentHopIndex: number, createdAt: any, updatedAt: any, destination?: { __typename?: 'Address', ip: string, info?: { __typename?: 'IpInfo', company: { __typename?: 'Company', name?: string | null } } | null } | null, availableHops: Array<{ __typename?: 'RunHop', id: number, mayPerformTransformation: boolean, hop: number, address?: { __typename?: 'Address', ip: string } | null, terminal: { __typename?: 'Terminal', id: number } }>, currentHop: { __typename?: 'RunHop', address?: { __typename?: 'Address', ip: string } | null }, hops: Array<{ __typename?: 'RunHop', id: number, status: RunHopStatus, type: RunHopType, hop: number, address?: { __typename?: 'Address', ip: string } | null, terminal: { __typename?: 'Terminal', id: number } }> } | null, presences: Array<{ __typename?: 'Presence', id: number, ip: string, websocketId: string, connectedAt: any, lastSeenAt: any }> }> };

export type JobsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type JobsSubscription = { __typename?: 'Subscription', jobs: Array<{ __typename?: 'Job', name?: string | null, id?: string | null, attemptsMade?: number | null, processedOn?: number | null, finishedOn?: number | null, timestamp?: number | null, data?: string | null, failedReason?: string | null, stacktrace?: Array<string> | null, status: JobStatus }> };

export type AddressWithInfoFragment = { __typename?: 'Address', ip: string, isInAltNetwork: boolean, info?: { __typename?: 'IpInfo', type: string, hostname?: string | null, carrier: { __typename?: 'Carrier', name?: string | null }, company: { __typename?: 'Company', domain?: string | null, name?: string | null, type?: string | null }, location: { __typename?: 'Location', city?: string | null, latitude?: number | null, longitude?: number | null, country: { __typename?: 'Country', name?: string | null, area: number, tld?: string | null, code?: string | null, flag: { __typename?: 'Flag', emoji?: string | null } } } } | null };

export type RegisterTerminalSubscriptionVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type RegisterTerminalSubscription = { __typename?: 'Subscription', registerTerminal?: { __typename?: 'Terminal', id: number, type: TerminalType, status: TerminalStatus, payload?: string | null, createdAt: any, updatedAt: any, run?: { __typename?: 'Run', id: string, nfcId?: string | null, url: string, imagePath?: string | null, packetType: RunPacketType, createdAt: any, updatedAt: any, destination?: { __typename?: 'Address', ip: string, isInAltNetwork: boolean, info?: { __typename?: 'IpInfo', type: string, hostname?: string | null, carrier: { __typename?: 'Carrier', name?: string | null }, company: { __typename?: 'Company', domain?: string | null, name?: string | null, type?: string | null }, location: { __typename?: 'Location', city?: string | null, latitude?: number | null, longitude?: number | null, country: { __typename?: 'Country', name?: string | null, area: number, tld?: string | null, code?: string | null, flag: { __typename?: 'Flag', emoji?: string | null } } } } | null } | null, origin?: { __typename?: 'Address', ip: string, isInAltNetwork: boolean, info?: { __typename?: 'IpInfo', type: string, hostname?: string | null, carrier: { __typename?: 'Carrier', name?: string | null }, company: { __typename?: 'Company', domain?: string | null, name?: string | null, type?: string | null }, location: { __typename?: 'Location', city?: string | null, latitude?: number | null, longitude?: number | null, country: { __typename?: 'Country', name?: string | null, area: number, tld?: string | null, code?: string | null, flag: { __typename?: 'Flag', emoji?: string | null } } } } | null } | null, availableHops: Array<{ __typename?: 'RunHop', id: number, type: RunHopType, mayPerformTransformation: boolean, hop: number, address?: { __typename?: 'Address', ip: string, isInAltNetwork: boolean, info?: { __typename?: 'IpInfo', type: string, hostname?: string | null, carrier: { __typename?: 'Carrier', name?: string | null }, company: { __typename?: 'Company', domain?: string | null, name?: string | null, type?: string | null }, location: { __typename?: 'Location', city?: string | null, latitude?: number | null, longitude?: number | null, country: { __typename?: 'Country', name?: string | null, area: number, tld?: string | null, code?: string | null, flag: { __typename?: 'Flag', emoji?: string | null } } } } | null } | null, terminal: { __typename?: 'Terminal', id: number, status: TerminalStatus } }>, currentHop: { __typename?: 'RunHop', id: number, type: RunHopType, mayPerformTransformation: boolean, hop: number, address?: { __typename?: 'Address', ip: string, isInAltNetwork: boolean, info?: { __typename?: 'IpInfo', type: string, hostname?: string | null, carrier: { __typename?: 'Carrier', name?: string | null }, company: { __typename?: 'Company', domain?: string | null, name?: string | null, type?: string | null }, location: { __typename?: 'Location', city?: string | null, latitude?: number | null, longitude?: number | null, country: { __typename?: 'Country', name?: string | null, area: number, tld?: string | null, code?: string | null, flag: { __typename?: 'Flag', emoji?: string | null } } } } | null } | null } } | null, connectionsTo: Array<{ __typename?: 'TerminalConnection', slot: number, to: { __typename?: 'Terminal', id: number, status: TerminalStatus, type: TerminalType } }> } | null };

export const AddressWithInfoFragmentDoc = gql`
    fragment AddressWithInfo on Address {
  ip
  info {
    type
    hostname
    carrier {
      name
    }
    company {
      domain
      name
      type
    }
    location {
      city
      country {
        name
        area
        tld
        code
        flag {
          emoji
        }
      }
      latitude
      longitude
    }
  }
  isInAltNetwork
}
    `;
export const CreateRunDocument = gql`
    mutation CreateRun($url: String!, $nfcId: String!) {
  createRun(url: $url, nfcId: $nfcId) {
    id
    nfcId
    url
    createdAt
    updatedAt
    imagePath
  }
}
    `;
export type CreateRunMutationFn = Apollo.MutationFunction<CreateRunMutation, CreateRunMutationVariables>;

/**
 * __useCreateRunMutation__
 *
 * To run a mutation, you first call `useCreateRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRunMutation, { data, loading, error }] = useCreateRunMutation({
 *   variables: {
 *      url: // value for 'url'
 *      nfcId: // value for 'nfcId'
 *   },
 * });
 */
export function useCreateRunMutation(baseOptions?: Apollo.MutationHookOptions<CreateRunMutation, CreateRunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRunMutation, CreateRunMutationVariables>(CreateRunDocument, options);
      }
export type CreateRunMutationHookResult = ReturnType<typeof useCreateRunMutation>;
export type CreateRunMutationResult = Apollo.MutationResult<CreateRunMutation>;
export type CreateRunMutationOptions = Apollo.BaseMutationOptions<CreateRunMutation, CreateRunMutationVariables>;
export const ResetTerminalDocument = gql`
    mutation ResetTerminal($terminalId: Float!) {
  setTerminalToIdle(terminalId: $terminalId)
}
    `;
export type ResetTerminalMutationFn = Apollo.MutationFunction<ResetTerminalMutation, ResetTerminalMutationVariables>;

/**
 * __useResetTerminalMutation__
 *
 * To run a mutation, you first call `useResetTerminalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetTerminalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetTerminalMutation, { data, loading, error }] = useResetTerminalMutation({
 *   variables: {
 *      terminalId: // value for 'terminalId'
 *   },
 * });
 */
export function useResetTerminalMutation(baseOptions?: Apollo.MutationHookOptions<ResetTerminalMutation, ResetTerminalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetTerminalMutation, ResetTerminalMutationVariables>(ResetTerminalDocument, options);
      }
export type ResetTerminalMutationHookResult = ReturnType<typeof useResetTerminalMutation>;
export type ResetTerminalMutationResult = Apollo.MutationResult<ResetTerminalMutation>;
export type ResetTerminalMutationOptions = Apollo.BaseMutationOptions<ResetTerminalMutation, ResetTerminalMutationVariables>;
export const ScanNfcForTerminalDocument = gql`
    mutation ScanNfcForTerminal($terminalId: Float!, $nfcId: String!) {
  scanNfcForTerminal(terminalId: $terminalId, nfcId: $nfcId)
}
    `;
export type ScanNfcForTerminalMutationFn = Apollo.MutationFunction<ScanNfcForTerminalMutation, ScanNfcForTerminalMutationVariables>;

/**
 * __useScanNfcForTerminalMutation__
 *
 * To run a mutation, you first call `useScanNfcForTerminalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useScanNfcForTerminalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [scanNfcForTerminalMutation, { data, loading, error }] = useScanNfcForTerminalMutation({
 *   variables: {
 *      terminalId: // value for 'terminalId'
 *      nfcId: // value for 'nfcId'
 *   },
 * });
 */
export function useScanNfcForTerminalMutation(baseOptions?: Apollo.MutationHookOptions<ScanNfcForTerminalMutation, ScanNfcForTerminalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ScanNfcForTerminalMutation, ScanNfcForTerminalMutationVariables>(ScanNfcForTerminalDocument, options);
      }
export type ScanNfcForTerminalMutationHookResult = ReturnType<typeof useScanNfcForTerminalMutation>;
export type ScanNfcForTerminalMutationResult = Apollo.MutationResult<ScanNfcForTerminalMutation>;
export type ScanNfcForTerminalMutationOptions = Apollo.BaseMutationOptions<ScanNfcForTerminalMutation, ScanNfcForTerminalMutationVariables>;
export const GetTerminalTypeDocument = gql`
    query getTerminalType($terminalId: Float!) {
  terminal(id: $terminalId) {
    id
    type
  }
}
    `;

/**
 * __useGetTerminalTypeQuery__
 *
 * To run a query within a React component, call `useGetTerminalTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTerminalTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTerminalTypeQuery({
 *   variables: {
 *      terminalId: // value for 'terminalId'
 *   },
 * });
 */
export function useGetTerminalTypeQuery(baseOptions: Apollo.QueryHookOptions<GetTerminalTypeQuery, GetTerminalTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTerminalTypeQuery, GetTerminalTypeQueryVariables>(GetTerminalTypeDocument, options);
      }
export function useGetTerminalTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTerminalTypeQuery, GetTerminalTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTerminalTypeQuery, GetTerminalTypeQueryVariables>(GetTerminalTypeDocument, options);
        }
export type GetTerminalTypeQueryHookResult = ReturnType<typeof useGetTerminalTypeQuery>;
export type GetTerminalTypeLazyQueryHookResult = ReturnType<typeof useGetTerminalTypeLazyQuery>;
export type GetTerminalTypeQueryResult = Apollo.QueryResult<GetTerminalTypeQuery, GetTerminalTypeQueryVariables>;
export const AllTerminalsDocument = gql`
    subscription AllTerminals {
  allTerminals {
    id
    type
    status
    payload
    connectionsTo {
      slot
      to {
        id
      }
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
      availableHops {
        id
        address {
          ip
        }
        terminal {
          id
        }
        mayPerformTransformation
        hop
      }
      currentHop {
        address {
          ip
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
        hop
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
    status
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
    run {
      id
      nfcId
      url
      imagePath
      packetType
      destination {
        ...AddressWithInfo
      }
      origin {
        ...AddressWithInfo
      }
      availableHops {
        id
        address {
          ...AddressWithInfo
        }
        type
        terminal {
          id
          status
        }
        mayPerformTransformation
        hop
      }
      currentHop {
        id
        address {
          ...AddressWithInfo
        }
        type
        mayPerformTransformation
        hop
      }
      createdAt
      updatedAt
    }
    connectionsTo {
      to {
        id
        status
        type
      }
      slot
    }
    createdAt
    updatedAt
  }
}
    ${AddressWithInfoFragmentDoc}`;

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