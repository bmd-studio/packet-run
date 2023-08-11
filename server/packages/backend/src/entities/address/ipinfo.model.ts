import 'reflect-metadata';
import { Rel } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class IpInfo {
    @Field()
    ip: string;
    
    @Field()
    type: string;
    
    @Field()
    hostname?: string;
    
    @Field(() => Carrier)
    carrier: Rel<Carrier>;
    
    @Field(() => Company)
    company: Rel<Company>;
    
    @Field(() => Connection)
    connection: Rel<Connection>;
    
    @Field(() => Currency)
    currency: Rel<Currency>;
    
    @Field(() => Location)
    location: Rel<Location>;
    
    @Field(() => Security)
    security: Rel<Security>;
    
    @Field(() => TimeZone)
    time_zone: Rel<TimeZone>;
}

@ObjectType()
export class Carrier {
    @Field()
    name?: string;
    
    @Field()
    mcc?: string;
    
    @Field()
    mnc?: string;
}

@ObjectType()
export class Company {
    @Field()
    domain: string;
    
    @Field()
    name: string;
    
    @Field()
    type: string;
}

@ObjectType()
export class Connection {
    @Field()
    asn: number;
    
    @Field()
    domain: string;
    
    @Field()
    organization: string;
    
    @Field()
    route: string;
    
    @Field()
    type: string;
}

@ObjectType()
export class Currency {
    @Field()
    code: string;
    
    @Field()
    name: string;
    
    @Field()
    name_native: string;
    
    @Field()
    plural: string;
    
    @Field()
    plural_native: string;
    
    @Field()
    symbol: string;
    
    @Field()
    symbol_native: string;
    
    @Field(() => Format)
    format: Rel<Format>;
}

@ObjectType()
export class Format {
    @Field(() => NegativeOrPositive)
    negative: Rel<NegativeOrPositive>;
    
    @Field(() => NegativeOrPositive)
    positive: Rel<NegativeOrPositive>;
}

@ObjectType()
export class NegativeOrPositive {
    @Field()
    prefix: string;
    
    @Field()
    suffix: string;
}

@ObjectType()
export class Location {
    @Field(() => ContinentOrRegion)
    continent: Rel<ContinentOrRegion>;
    
    @Field(() => Country)
    country: Rel<Country>;
    
    @Field(() => ContinentOrRegion)
    region: Rel<ContinentOrRegion>;
    
    @Field()
    city: string;
    
    @Field()
    postal: string;
    
    @Field()
    latitude: number;
    
    @Field()
    longitude: number;
    
    @Field(() => LanguagesEntityOrLanguage)
    language: Rel<LanguagesEntityOrLanguage>;
    
    @Field()
    in_eu: boolean;
}

@ObjectType()
export class ContinentOrRegion {
    @Field()
    code: string;
    
    @Field()
    name: string;
}

@ObjectType()
export class Country {
    @Field()
    area: number;
    
    @Field(() => [String])
    borders: string[];
    
    @Field()
    calling_code: string;
    
    @Field()
    capital: string;
    
    @Field()
    code: string;
    
    @Field()
    name: string;
    
    @Field()
    population: number;
    
    @Field()
    population_density: number;
    
    @Field(() => Flag)
    flag: Rel<Flag>;
    
    @Field(() => [LanguagesEntityOrLanguage])
    languages?: Rel<LanguagesEntityOrLanguage>[];
    
    @Field()
    tld: string;
}

@ObjectType()
export class Flag {
    @Field()
    emoji: string;
    
    @Field()
    emoji_unicode: string;
    
    @Field()
    emojitwo: string;
    
    @Field()
    noto: string;
    
    @Field()
    twemoji: string;
    
    @Field()
    wikimedia: string;
}

@ObjectType()
export class LanguagesEntityOrLanguage {
    @Field()
    code: string;
    
    @Field()
    name: string;
    
    @Field()
    native: string;
}

@ObjectType()
export class Security {
    @Field()
    is_abuser: boolean;
    
    @Field()
    is_attacker: boolean;
    
    @Field()
    is_bogon: boolean;
    
    @Field()
    is_cloud_provider: boolean;
    
    @Field()
    is_proxy: boolean;
    
    @Field()
    is_relay: boolean;
    
    @Field()
    is_tor: boolean;
    
    @Field()
    is_tor_exit: boolean;
    
    @Field()
    is_vpn: boolean;
    
    @Field()
    is_anonymous: boolean;
    
    @Field()
    is_threat: boolean;
}

@ObjectType()
export class TimeZone {
    @Field()
    id: string;
    
    @Field()
    abbreviation: string;
    
    @Field()
    current_time: string;
    
    @Field()
    name: string;
    
    @Field()
    offset: number;
    
    @Field()
    in_daylight_saving: boolean;
}
