# D2-Troubleshooting Guide

## PACKET RUN

This guide intends to help solve commonly occurring issues while setting up, starting and operating Packet Run. It contains a set of questions and answers that should help achieve this goal.

When running into issues during operation, and you cannot use this guide to resolve these issues, first contact your shift responsible. Then, escalate to preferably Lei (+31642030098) or alternatively Jort (+31643431493).

If even one terminal is broken, the installation cannot work, as almost all paths need all terminals in order to function. When this happens during opening hours, gently inform visiting public that the installation is out of order and attempt to solve the issue.

## One or more terminals have black screens

Sometimes during boot, the screens don't recognise the Raspberry Pi coming offline. Alternatively, some screens might accidentally have a timer set that power off the screen after a set time (often 4 h).

To power up the screen, click the power button that is at the backside of the screen in the bottom right corner. The screen should automatically power on and the terminal screen should show.

Take a note of which screen required pressing the power button so we may fix its settings later.

## All of the terminals are showing a terminal window instead of the regular screen.

This probably means that the Raspberry Pis have an issue connecting to the server (the Mac mini).

First, verify that the Mac mini has booted by peering through the underside of the desk and seeing if the front light indicator is on. It faces the side of the desk and should be white. If it's off, push the power button on the backside (black side) of the Mac mini and wait for the terminals to show the terminal screens automatically.

Secondly, verify that the ethernet switch is powered. Check that there are lights on the ethernet switch that is integrated in the side of the desk.

Thirdly, verify that the Mac mini has two ethernet cables that are connected properly. One (the one in the regular ethernet port) should be connected to an outside internet connection. The other (the one in the USB-C Ethernet dongle), should be connected to the ethernet switch. Verify that the port lights up on the ethernet switch. If it does not, switch the cable to another port to verify that it's working.

If none of this fixes the issue, you might be dealing with a networking setup issue. Escalate to Lei or Jort and provide them with the steps you've taken to fix the problem.

## The NFC scanner for a single terminal is not working

The NFC scanners are a bit finicky in both setup and scanning.

First, double-check that the terminal has had a proper chance to scan the tag. Rotate the ball in lots of directions and see if this solves the issue. Alternatively, take the NFC tag out of the ball and place it directly on the topside of the scanner.

If this doesn't solve the issue, you might be dealing with some sort of setup issue. Reboot the terminal by pulling the USB-C (white) cable from the Raspberry Pi on the right backside of the terminal. Wait a couple seconds, then, put it back again and wait for the terminal to boot. Repeat this process three times until definitively asserting that the scanner is broken.

Finally, this might be a wiring issue. Ensure the pins are connected correctly according to the documentation: [GitLab Documentation](https://gitlab.moeilijkedingen.nl/ddw-2023/packet-run/-/tree/main/client). You can access the Raspberry Pi by pulling the wooden frame holding the NFC scanner towards you. Ensure that all pins are making proper contact, both on the scanner end and on the Raspberry Pi.

The NFC scanner is initialized only at boot. When this fails, the software will not attempt to automatically reconnect to the scanner. Hence, after every attempted fix, you will need to reboot the Raspberry Pi by temporarily removing the power cable (USB-C, white).

If you want to rewire the pins, make sure you're comfortable doing so. Double-check everything. If you wire the NFC scanner incorrectly, this will destroy both the Raspberry Pi and the NFC scanner, an expensive and time-consuming swap. Escalate if you're uncomfortable.

If the pins are wired wrong or have come loose, you can make an attempt to fix them. To do so, first disconnect the power. Then, swap the pins into the correct position. Double-check that the pin wiring is right, before reconnecting the power. Have someone else take a look if they're available.

If this doesn't fix the issue, the NFC Scanner itself might be broken. We have spares available. Escalate to Lei or Jort to get those fixed.

## One or more terminals are throwing errors

If terminals are briefly disconnected from their ethernet connection, they might end up not automatically reconnecting to the server (they should be). In this case, it might be wise to reset that single terminal and/or all terminals.

To reset a single terminal, find the Raspberry Pi at the backside of the terminal, approximately behind the scanner. Disconnect the white USB-C cable that powers it, wait a few seconds, and then reconnect the cable. The terminal should boot up automatically.

To reset all terminals, find the plug from terminal 11 that is in the power strip on the underside of the desk. It should be white. Remove it from the power strip, wait a few seconds, then plug it in again. All terminals should boot up automatically. Then, press F5 on both terminals with a keyboard to reset these as well.

## One terminal is stuck in a weird state

Sometimes, people might do a weird run and a terminal might be stuck in a state it can't get out of. You can reset terminal state through the Mac mini.

To reset the state, switch terminal 1 to the Mac mini by pressing the button that is at the backside of the monitor in the right top corner. If macOS does not automatically show up, press the monitor power button at the backside in the right bottom corner. If it shows white snow, press the button at the right top corner two more times slowly. Also, retrieve the mouse that is stored on the underside of the desk (left side).

A Chrome window should already be open showing all terminals. If there isn't open a Chrome window and navigate to [http://localhost:3000](http://localhost:3000). Click the terminal that is stuck, and in the pop-up screen in the left top corner, click "Reset terminal".

## None of the maps are displaying / Terminal addresses are always "???" / Terminal 1 never allows a website typed in

It appears that the internet connection might be acting up.

Ensure that the cable that connects to the Ethernet port on the Mac mini is connected correctly.

Double-check that the Mac mini has a connection to the internet. Switch terminal 1 to the Mac mini by pressing the button that is at the backside of the monitor in the right top corner. If macOS does not automatically show up, press the monitor power button at the backside in the right bottom corner. If it shows white snow, press the button at the right top corner two more times slowly. Also, retrieve the mouse that is stored on the underside of the desk (left side).

Then, navigate to Google, and check if the website is loading and working as expected. With this information, escalate to Lei or Jort.
