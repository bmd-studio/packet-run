/* eslint-disable */

import _ from 'lodash'

/**
 * This is a web serial adapter of `Pn532`. A pn532 instance must register exactly one adapter plugin. After register to PN532 instance, this plugin will expose plugin functions under `pn532.$adapter`.
 * @example
 * const pn532ble = new Pn532()
 * pn532ble.use(new Pn532WebserialAdapter())
 * console.log(JSON.stringify(await pn532ble.getFirmwareVersion()))
 * // {"firmware":"1.6","ic":"PN532","iso14443a":true,"iso14443b":true,"iso18092":true}
 */
export default class Pn532WebserialAdapter {
    _isOpen = false
    name = 'adapter'
    port: SerialPort | null = null

    install(context: any) {
        const { pn532, utils } = context
        const me = this

        if (pn532.$adapter) throw new Error('adapter already exists')

        function getSerial() {
            return navigator?.serial
        }

        /**
         * Determines whether Web Serial API is supported.
         * @memberof Pn532WebserialAdapter
         * @instance
         * @async
         * @returns {Promise<boolean>} Resolve with a boolean indicating whether or not Web Serial API is supported.
         */
        async function isSupported() {
            return !_.isNil(getSerial())
        }

        /**
         * Determines whether the connection of adapter is open.
         * @memberof Pn532WebserialAdapter
         * @instance
         * @async
         * @returns {boolean} A boolean indicating whether or not the connection of adapter is open.
         */
        function isOpen() {
            return me._isOpen
        }

        /**
         * Disconnect the connection of adapter.
         * @memberof Pn532WebserialAdapter
         * @instance
         * @async
         * @returns {Promise<null>} Resolve after finished.
         */
        async function disconnect() {
            if (_.isNil(me.port)) return
            await me.port.close()
        }

        async function disconnected() {
            me._isOpen = false
            if (me.port) me.port = null
            utils.logTime('device disconnected')
        }

        /**
         * Open the connection of adapter.
         * @memberof Pn532WebserialAdapter
         * @instance
         * @async
         * @returns {Promise<null>} Resolve after finished.
         */
        async function connect() {
            try {
                if (!await isSupported()) throw new Error('WebSerial not supported')

                // request port
                const serial = getSerial()
                const ports = await serial.getPorts();

                console.log(`Retrieved ${ports} ports`, ports);

                // Loop through all ports
                for await (let port of ports) {
                    try {
                        console.log('Attempting to open port', port);
                        // Attemp to open port
                        await port.open({ baudRate: 115200 });

                        // Assign the port and exit the loop if it succeeds
                        me.port = port;
                        break;
                    } catch(e) {
                        console.error('Failed to open port', port);

                        // If not, continue with the next port
                        continue;
                    }
                }
                if (!me.port) throw new Error('user canceled')
                const info = await me.port.getInfo()
                utils.logTime(`port selected, usbVendorId = ${info.usbVendorId}, usbProductId = ${info.usbProductId}`)
                pn532.tx = me.port;
                // @ts-ignore
                me.port.readable.pipeTo(pn532.rx.writable)
                me.port.addEventListener('disconnect', disconnected)
                me._isOpen = true

                await pn532.sendCommandWakeup()
                await pn532.resetSettings()
            } catch (err) {
                disconnected()
                throw err
            }
        }

        pn532.addMiddleware('writePacket', async (ctx: any, next: any) => {
            if (!isOpen()) await connect()
            return await next()
        })

        return {
            connect,
            disconnect,
            isOpen,
            isSupported,
        }
    }
}