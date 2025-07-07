# D2-Troubleshooting Guide

## PACKET RUN

This guide intends to help solve commonly occurring issues while setting up, starting and operating Packet Run. It contains a set of questions and answers that should help achieve this goal.

If even one terminal is broken, the installation cannot work, as almost all paths need all terminals in order to function. When this happens during opening hours, gently inform visiting public that the installation is out of order and attempt to solve the issue.

The Packet Run software can be remotely debugged and updated by Lei. In order for this to work, the installation will need to remain powered. If any of the issues requires escalation, leave the installation powered on, so Lei can take a look later.

## One or more terminals have black screens

Sometimes during boot, the screens don't recognise the Raspberry Pi coming online. Alternatively, some screens might accidentally have a timer set that power off the screen after a set time (often 4 h).

To power up the screen, click the power button that is at the backside of the screen in the bottom right corner. The screen should automatically power on and the terminal screen should show.

Take a note of which screen required pressing the power button so we may fix its settings later.

## All of the terminals are showing a terminal window instead of the regular screen.

This probably means that the clients (terminals) have an issue connecting to the server.

First, verify that the server has booted by peering through the underside of the desk and seeing if the lights are on. The server ifars located on the inside of the desk (on the far side related to the installation).

Secondly, verify that the ethernet switch is powered. It's located on the installation side, on the ouside of the desk. All terminals are connected in order (1-12) and receive internet via the server, which is connected on port 16. Ports 1-12 and port 16 should all be lighted up on the switch.

Thirdly, verify that the Mac mini has two ethernet cables that are connected properly. One (the one in the regular ethernet port) should be connected to an outside internet connection. The other (the one in the USB-C Ethernet dongle), should be connected to the ethernet switch. Verify that the port lights up on the ethernet switch. If it does not, switch the cable to another port to verify that it's working.

If none of this fixes the issue, you might be dealing with a networking setup issue. Escalate to Lei and provide them with the steps you've taken to fix the problem. There might be an issue with boot, particularly in restoring the Packet Run database. This needs to be debugged through a VPN connection to the server. 

## The NFC scanner for a single terminal is not working

The NFC scanners are a bit finicky in both setup and scanning.

First, double-check that the terminal has had a proper chance to scan the tag. Rotate the ball in lots of directions and see if this solves the issue. Alternatively, take the NFC tag out of the ball and place it directly on the topside of the scanner.

If this doesn't solve the issue, you might be dealing with some sort of setup issue. Reboot the terminal by pulling the USB-C (white) cable from the Raspberry Pi on the right backside of the terminal. Wait a couple seconds, then, put it back again and wait for the terminal to boot. Repeat this process three times until definitively asserting that the scanner is broken.

Finally, this might be a wiring issue. Ensure the pins are connected correctly [according to the documentation](../client/README.md). You can access the Raspberry Pi by pulling the wooden frame holding the NFC scanner towards you (put your thumbs on the two tabs). Ensure that all pins are making proper contact, both on the scanner end and on the Raspberry Pi. Affix with hot glue if necessary.

The NFC scanner is initialized only at boot. When this fails, the software will not attempt to automatically reconnect to the scanner. Hence, after every attempted fix, you will need to reboot the Raspberry Pi by temporarily removing the power cable (USB-C, white).

If you want to rewire the pins, make sure you're comfortable doing so. Double-check everything. If you wire the NFC scanner incorrectly, this will destroy both the Raspberry Pi and the NFC scanner, an expensive and time-consuming swap. Escalate if you're uncomfortable.

If the pins are wired wrong or have come loose, you can make an attempt to fix them. To do so, first disconnect the power. Then, swap the pins into the correct position. Double-check that the pin wiring is right, before reconnecting the power. Have someone else take a look if they're available.

If this doesn't fix the issue, the NFC Scanner itself might be broken. Spares are available, look for the red PN532 NFC Scanner boards. To install these, first solder the included headers to the board. Then, remove the jumper cable from the faulty scanner and remove the screws. Then, put the new board in the exact same place and reseat the jumper cables in the same place. Check the [jumper wires documentation](../client/README.md) to ensure they are connected in the right order. Boot the terminal and test.

## One or more terminals are throwing errors

If terminals are briefly disconnected from their ethernet connection, they might end up not automatically reconnecting to the server (they should be). In this case, it might be wise to reset that single terminal and/or all terminals.

To reset a single terminal, find the Raspberry Pi at the backside of the terminal, approximately behind the scanner. Disconnect the white USB-C cable that powers it, wait a few seconds, and then reconnect the cable. The terminal should boot up automatically.

To reset all terminals, find the plug from terminal 11 that is in the power strip on the underside of the desk. It should be white. Remove it from the power strip, wait a few seconds, then plug it in again. All terminals should boot up automatically. Then, press F5 on both terminals with a keyboard to reset these as well.

## The press is not working

The press works because there is a small magnet in the press, and a small hall sensor right next to the NFC scanner. First, verify that the hall sensor is still working by placing a magnet on flat piece of 3D-printed material, on the left of the NFC scanner. If this doesn't work, you'll need to replace the sensor itself.

To replace the sensor, pull the wooden part in which the NFC-scanner is seated towards you by pushing your thumbs on the two tabs. Then, remove the hall sensor from the scanner module with the help of some plyers. 

If no readymade hall sensor assembly is available, you'll need to make your own. Take one of the jumper cables with the purple wires, and strip them bare on one end. Then, place some heatshrink tubing, before soldering to the legs of an available hall sensor component. Check the [jumper wires documentation](../client/README.md) for the best way to connect them, but the prevailing wisdom is black = ground, white = supply, purple = signal. 

With the complete hall sensor assembly, bend the sensor itself 90 degrees, so that the flat side of the component (the non-branded side) is oriented outwards. This is the side of the component that needs to be oriented towards the magnet. Push it down in the hall sensor cavity so that it's as far as it can go. Use hot glue to affix the component. Connect the cables to the Raspberry Pi and test whether it works again.