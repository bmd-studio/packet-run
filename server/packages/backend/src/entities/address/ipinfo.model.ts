import 'reflect-metadata';
import { Rel } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class IpInfo {
    @Field()
    ip: string;
    
    @Field()
    type: 'IPv4' | 'IPv6';
    
    @Field({ nullable: true })
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
    @Field({ nullable: true })
    name?: string;
    
    @Field({ nullable: true })
    mcc?: string;
    
    @Field({ nullable: true })
    mnc?: string;
}

@ObjectType()
export class Company {
    @Field({ nullable: true })
    domain?: string;
    
    @Field({ nullable: true })
    name?: string;
    
    @Field({ nullable: true })
    type?: string;
}

@ObjectType()
export class Connection {
    @Field({ nullable: true })
    asn?: number;
    
    @Field({ nullable: true })
    domain?: string;
    
    @Field({ nullable: true })
    organization?: string;
    
    @Field({ nullable: true })
    route?: string;
    
    @Field({ nullable: true })
    type?: 'business' | 'education' | 'government' | 'inactive' | 'isp' | 'hosting';
}

@ObjectType()
export class Currency {
    @Field({ nullable: true })
    code?: string;
    
    @Field({ nullable: true })
    name?: string;
    
    @Field({ nullable: true })
    name_native?: string;
    
    @Field({ nullable: true })
    plural?: string;
    
    @Field({ nullable: true })
    plural_native?: string;
    
    @Field({ nullable: true })
    symbol?: string;
    
    @Field({ nullable: true })
    symbol_native?: string;
    
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
    @Field({ nullable: true })
    prefix?: string;
    
    @Field({ nullable: true })
    suffix?: string;
}

@ObjectType()
export class Location {
    @Field(() => ContinentOrRegion)
    continent: Rel<ContinentOrRegion>;
    
    @Field(() => Country)
    country: Rel<Country>;
    
    @Field(() => ContinentOrRegion)
    region: Rel<ContinentOrRegion>;
    
    @Field({ nullable: true })
    city?: string;
    
    @Field({ nullable: true })
    postal?: string;
    
    @Field({ nullable: true })
    latitude?: number;
    
    @Field({ nullable: true })
    longitude?: number;
    
    @Field(() => LanguagesEntityOrLanguage)
    language: Rel<LanguagesEntityOrLanguage>;
    
    @Field()
    in_eu: boolean;
}

@ObjectType()
export class ContinentOrRegion {
    @Field({ nullable: true })
    code?: string;
    
    @Field({ nullable: true })
    name?: string;
}

@ObjectType()
export class Country {
    @Field()
    area: number;
    
    @Field(() => [String])
    borders: string[];
    
    @Field({ nullable: true })
    calling_code?: string;
    
    @Field({ nullable: true })
    capital?: string;
    
    @Field({ nullable: true })
    code?: string;
    
    @Field({ nullable: true })
    name?: string;
    
    @Field({ nullable: true })
    population?: number;
    
    @Field({ nullable: true })
    population_density?: number;
    
    @Field(() => Flag)
    flag: Rel<Flag>;
    
    @Field(() => [LanguagesEntityOrLanguage], { nullable: true })
    languages?: Rel<LanguagesEntityOrLanguage>[];
    
    @Field({ nullable: true })
    tld?: string;
}

@ObjectType()
export class Flag {
    @Field({ nullable: true })
    emoji?: string;
    
    @Field({ nullable: true })
    emoji_unicode?: string;
    
    @Field({ nullable: true })
    emojitwo?: string;
    
    @Field({ nullable: true })
    noto?: string;
    
    @Field({ nullable: true })
    twemoji?: string;
    
    @Field({ nullable: true })
    wikimedia?: string;
}

@ObjectType()
export class LanguagesEntityOrLanguage {
    @Field({ nullable: true })
    code?: string;
    
    @Field({ nullable: true })
    name?: string;
    
    @Field({ nullable: true })
    native?: string;
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
    @Field({ nullable: true })
    id?: string;
    
    @Field({ nullable: true })
    abbreviation?: string;
    
    @Field({ nullable: true })
    current_time?: string;
    
    @Field({ nullable: true })
    name?: string;
    
    @Field()
    offset: number;
    
    @Field()
    in_daylight_saving: boolean;
}
