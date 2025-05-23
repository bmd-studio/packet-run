export const theme = {
    destinationBar: {
        spaceLeft: 216,
        blockSpacer: 16,
        destinationBlock: {
            width: 360
        }
    }
}

/**
 * This config variable describes whether the front-end is in debug mode. In
 * debug mode, extra information will be shown on all terminal screens that help
 * with debugging issues.
 */
export const DEBUG = process.env.NEXT_PUBLIC_DEBUG === 'true';

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const ORIGIN = typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1';
export const BACKEND_URL = `http://${ORIGIN}:8080`;

export const DEFAULT_WEBSITE = process.env.NEXT_PUBLIC_DEFAULT_WEBSITE || 'ddw.nl'