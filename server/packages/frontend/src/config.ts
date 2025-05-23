export const theme = {
    destinationBar: {
        spaceLeft: 216,
        blockSpacer: 16,
        destinationBlock: {
            width: 360
        }
    }
}

export type Mode = 'standalone' | 'distributed';

/**
 * This config variable describes the mode of operation for the front-end.
 * - 'standalone': All terminals are accessible in a single browser window
 * - 'distributed': Each terminal runs in its own browser window, requiring physical movement between terminals
 */
if (process.env.NEXT_PUBLIC_MODE && process.env.NEXT_PUBLIC_MODE !== 'standalone' && process.env.NEXT_PUBLIC_MODE !== 'distributed') {
    console.warn(`Invalid MODE value: ${process.env.NEXT_PUBLIC_MODE}. Defaulting to 'standalone'`);
}

export const MODE: Mode = process.env.NEXT_PUBLIC_MODE === 'distributed' ? 'distributed' : 'standalone';

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const ORIGIN = typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1';
export const BACKEND_URL = `http://${ORIGIN}:8080`;

export const DEFAULT_WEBSITE = process.env.NEXT_PUBLIC_DEFAULT_WEBSITE || 'ddw.nl'