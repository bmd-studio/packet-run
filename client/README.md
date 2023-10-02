# Packet Run — Client
This directory shall contain all software and documentation for running directly on terminal
units. Terminal units contain Raspberry Pi 4 boards.

## GPIO Pins
All terminals contain a [PN532-based NFC scanner board](https://www.tinytronics.nl/shop/nl/communicatie-en-signalen/draadloos/rfid/rfid-nfc-kit-pn532-met-s50-kaart-en-s50-key-tag). Some terminal units may
additionally contain a [3144 Hall Effect
sensor](https://www.tinytronics.nl/shop/nl/sensoren/magnetisch-veld/3144-hall-effect-switch).
Both pieces of electronics are to be connected to the Raspberry Pi GPIO pins, so
that the software can read them.

For reference on how the GPIO pins are numbered, use https://pinout.xyz.

### NFC Reader
The NFC scanner is read using WebSerial. This means that the board should be
connected as a UART device, so it is available over WebSerial. First of all,
make sure the DIP switches on the board are both set to OFF (towards the
numbers). This configures the PN532 in UART/HSU mode. When connecting the pins,
use the pin naming that is bound on the bottom of the board (GND/VCC/TXD/RXD).

The pins should be connected as such (board => RPI):
* GND => GND (pin 6)
* VCC => 5V (pin 4)
* SDA/TXD => UART 1 RX (pin 10)
* SCL/RXD => UART 1 TX (pin 8)

### Hall effect sensor
The hall effect sensor is read through a NodeJS webserver, the code for which
can be found in `./hall-sensor-server`.

Use a ribbon cable to connect the hall sensor to the Raspberry Pi. The following
pin layout connects the pins on the sensor from left to right when the side with
the serial number is facing you.

The pins should be connected as such (sensor => RPI):
* SUPPLY (left) => 5V (pin 2)
* GROUND (middle) => GND (pin 9)
* OUTPUT (right) => GPIO 2 (pin 3)
