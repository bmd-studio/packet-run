declare module 'pn532.js' {
    export interface FirmwareVersion {
        firmware: string;
        ic: string;
        iso14443a: boolean;
        iso14443b: boolean;
        iso18092: boolean;
    }

    export class Packet extends Uint8Array {
        base64: string;
        base64url: string;
        hex: string;
    }

    export interface MifareTarget {
        atqa: Packet;
        pack: Packet;
        rats: Packet;
        sak: Packet;
        uid: Packet;
    }

    export class Hf14a {
        async mfSelectCard(options?: { timeout: number }): MifareTarget;
    }

    export class Pn532 {
        public $hf14a: Hf14a;
        async use(plugin: object, options?: object): Promise<Pn532>;
        async getFirmwareVersion(): Promise<FirmwareVersion>;
    }
}

declare module 'pn532.js/plugin/Hf14a.js' {
    export default Hf14a;
}

declare module 'pn532.js/plugin/WebserialAdapter.js' {
    export default class WebserialAdapter {};
}