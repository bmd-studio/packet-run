# D2-Build-up Guide

## PACKET RUN

This guide describes how the Packet Run installation should be built up. Please refer to the following documents providing information on track layout, required parts, tools and materials.

- [ ] Inventory of Parts
- [ ] Required tools and materials
- [ ] Track list and build order

## Construction

Constructing the installation requires that the particular order in this document is followed. It's strongly recommended to ensure that all parts are present at location before starting assembly.

## Raising the superstructure

The superstructure consists of a centre piece, to which three side beams are connected. At the end of these horizontal beams are side plates, to which vertical beams are attached. The assembly of a horizontal beam, a vertical beam and two side plates is called a leg. To stiffen the construction, a number of steel cables are attached to hooks in the vertical beams, along with a set of scaffolding beams attached to the base of the vertical beams.

The superstructure is heavy and dangerous. It must be assembled by a team of at least four people. Steel-toed boots are strongly recommended while setting up.

Firstly, ensure that all pieces are present and accounted for. The superstructure should be assembled in one go, in order to ensure stability and minimise any changes of collapse. Make sure to keep anyone out of the build-up area. Before starting the procedure, inform everyone involved exactly how the procedure is carried out. Then, place markers on the floor, indicating rougly where all three legs should end up.

Most parts for the superstructure are numbered (usually 1-3 or 1-6). Numbering in the installation always originates from the desk, halfway between the two legs, following the circle in an anticlockwise manner.

Secondly, place the center piece on the floor, roughly at the center of the exhibition plot. Ensure that the eye nut is safely attached to thread that extends from the top of the center piece. Then, according to the labels, insert the horizontal beams into the center piece, and fasten them with the corresponding bolts.

Thirdly, unfold and place the two lifting tripods next to the center piece so that they're stable. Place the U-shape attachments on top of the tripods. Wrap the steel cable used for lifting the center piece around the steel profiles, and then place the steel profile into the U-shaped attachments.

Fourthly, lift the horizontal assembly off of the ground. Before you lift, ensure that the steel cable is short enough, so that the tripods can fully extend to the working height of the superstructure. This means the assembly might need to be lifted by hand so that it can attach to the steel cable. If you must lift by hand, put one person at the end of each horizontal beam, and a single person at the center. Coordinate so that the assembly is lifted synchronously, and attach it to the lifting tripods. Lift to the full height for the superstructure, approximately 2 m.

Now, all legs shall be added to the assembly one by one. For this, follow these instructions until all legs are safely in place.

Firstly, place a support rod under the end of the horizontal beam you will be attaching the vertical beam to. One person must monitor and hold the beam at all times. Then, using a ladder, attach the side plates, one by one to the vertical beam. Attach the bolts but do not tighten them so the plates remain in place. Subsequently, lift the vertical beam in place, and attach it to the assembly using bolts. Ensure that the beams and plates are oriented well, and then tighten all bolts fully. Lastly, slowly and carefully, remove the support rod from under the leg, checking that it can support its own weight.

Wires are numbered W1 - W3, with W1 starting at the bottom, W2 at the middle and W3 at the top.

Repeat these instructions so that all legs are attached. Finally, the superstructure should be freely standing and mostly stable. If so, remove all lifting equipment from under the superstructure and out of the way. Now, attach all steel cables to the superstructure. Also, attach the scaffolding to the bottom of the vertical beams. Use the sleeves to connect two individual scaffolding tubes into one. Lastly, tighten all wire strainers so that the entire superstructure is in tension.

Before continuing, firstly ensure that the superstructure is in proper tension by wobbling one of the legs. If not, tighten the wire strainers more and ensure all bolts are properly tightened. When you are convinced the superstructure is stable, move the superstructure to its final position.

## Placing the desk

Now that the superstructure is in place, use it to align the desk into place. It should be located -20 cm from the scaffolding tube. It should be perfectly perpendicular to the scaffolding, located in the exact middle of the scaffolding assembly.

Place the Mac mini inside the desk, with the front facing the wooden side panel. Align it using the brown markers on the inside of the desk. Attach the power cable, the USB cable and the Ethernet USB-C dongle that should be nearby.

If already available, route both power and ethernet to the desk. The power cord should be connected to the power strip inside of the desk. Ethernet should be connected to the ethernet port of the Mac mini. Remove any painter's tape keeping any keyboards in place.

Leave the desk for now. More things will be attached to the desk as soon as the terminals are placed.

## Placing the terminals

Next, all terminals should be placed at their appropriate spots. Please refer to an overview of terminal placement as a helpful guide. Terminals are numbered 1-12, and are ordered counter-clockwise in a circle, starting at the desk (terminal 1+12). We recommend using both the placement measuring rope and terminal placement template as follows. To set up the placement measuring rope, place the measuring tape rope through the O-ring in the steel center. Pull it far enough along so that the two ends meet up. Keep them next to each other, in the same direction, and use a piece of tape to secure them to each other. The ends of the rope indicate the position op the back legs for all terminals.

Identify the correct location for a single terminal. Place it in roughly the right space. Then, use the measurement rope to put the terminals at the right distance from the center. The back legs of the terminals should be positioned exactly against the place where the rope meets the ground when at tension. Then, use the placement template to position the terminal relative to the previous terminal. The back legs of the terminal should fit precisely in the template so that the distance between them is equal between all terminals in the circle.

Repeat this process until all terminals are in the right place. Then, run another round with both the template and measuring rope so that all terminals are definitively in the right place. Lastly, put some tape on the ground for each terminal, as to indicate it's desired position.

Now that all terminals are in place, we must connect all cables. First, we'll install the power cables. Starting at terminal 1, take the power cord from the terminal and connect it to power strip of the terminal on its right. Route the cable through the cables guides in both the origin and destination terminal. The cable should be routed down, somewhat across the ground to the next terminal. Repeat this process until all cords are connected. The power cord for terminal 11 should be routed to the desk, and connected to the power strip in the desk.

Next up, install all ethernet cables. Note that there are two coils of cable connected to the terminal, one next to the Raspberry Pi, and another in the departing lanes for tracks. Make sure to leave the coil next to the Raspberry Pi in place, and only uncoil the one in the departing lanes, as all ethernet cables have been approximately measured to order.

To connect a single terminal cable, uncoil the coil the departing lane cable fully. Make sure the cable is mounted through the cable guide, then route it down the leg, under the scaffolding tube. Then, place it on the ground along the scaffolding tubes, taking the shortest routes along the tubes towards the ethernet switch. Make sure to always route the cable along the underside of the scaffolding, so we don't accidentally wrap around or across any tubing or other cables. When arriving at the switch, plug the cable into the port with the number of the terminal.

Now, connect the desk to a wall socket. All terminals should boot. Verify that all terminals are powered by checking the screen lights up and Raspberry Pi boots. Note that the installation won't work until the Mac mini is booted, it's just necessary to verify it is powered right now. Also, verify that all Raspberry Pis have a working ethernet connection, by checking that the corresponding port for a terminal lights up on the ethernet switch. When all checks are complete, power down the installation by pulling the power plug.

The switch might have a bad port that does not work: port 4. If the cable does work in other port, preferably connect it to a port that is the original terminal number +10, or else, any working port.

Lastly, connect the ethernet cable providing internet, and route it along the scaffolding tubes and installation to the Mac mini, connecting the cable to the Mac mini's ethernet port.

When all ethernet cables and power cables are connected, cable manage both along the scaffolding tubes. Neatly order all cables respective to each other, then, use tie wraps to tie cables to the back of the scaffolding tube, approximately every 20-30cm. At the ethernet switch, use tie wraps every 10 cm to tie the cables to each other on the stretch of free-hanging cables between the switch and the scaffolding tube.

## Hanging the tracks

Once the superstructure, the desk and all terminals are in place, only hanging the tracks remains. This is a precise task, that shouldn't be rushed. Before you begin, make sure all tracks are present at the location. Also ensure all track are ordered by build group, according to the respective document: Track list and build order. Then, follow these instructions to hang an individual track:

First hang all tracks with the lowest build order number. Then, continue in the same manner for the next build order group until all groups have been placed.

The receiving prongs for the slinky are quite brittle. Take care to keep them intact while you are hanging tracks in the installation.

Take a single track from the lowest remaining build group, preferably following the order designated in the track list document. Loosen the rope knots that are used to tie the track segments together, and unpack the track segments from each other. Check the clips attached to the ends of the ropes, find the matching clips on the steel wires, and hang s-hooks at the places where rope holds should connect.

Read the labels on the segments and visualise where the track should be placed, then pick up the track with at least two persons, and place it in the installation. Work your way from the origin terminal, connecting the track to the origin terminal, then connecting all rope holds starting at the origin, until you place the last track segment in the receiving terminal. The last track segment contains a little guide on the track underside that should hook the reception part in the terminal. Check that the rope holds are at approximately the right height, and adjust them, by sliding the knots along the rope, if necessary.

Repeat until all tracks are in place. You may need to adjust rope holds for other tracks when hanging a new track. Make sure to leave all clips in place until all tracks are in place and properly adjusted.

When all tracks are in place, adjust all rope hold heights so that all tracks can successfully be routed. To do this, start at the first slot of the first terminal, and route a ball through the opening. Ensure that the ball successfully completes its journey, adjusting the requisite rope holds until it does. Continue with the next slot until all tracks are completed successfully. Then, route all tracks again, to ensure that all tracks can still be routed after previous adjustments.

When you are 100% sure all tracks can be routed, remove all clips from both the ropes and steel wires, and place them in order in their respective boxes (white boxes, labeled, IKEA Bevara).

Congrats! The installation is now mechanically complete. Proceed with testing to uncover the unavoidable technical issues.

## Integration testing

For integration testing, follow the Start-up and shutdown guide. Use the Troubleshooting Guide to identify any issues and solve them.
