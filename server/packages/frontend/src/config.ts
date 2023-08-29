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