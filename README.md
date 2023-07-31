<img alt="Packet Run" src="./docs/assets/packet-run-logo.svg" height="72" />

Packet Run is an interactive art installation that visualises how data travels
across the internet in discrete packets. This process is known as **Internet
Protocol routing**.

Packet Run aims to clarify the hidden process of packet routing, thereby showing
everyday users what this process looks like, what risks are involved in the
process and what the future of the internet could look like.

Packet Run will be initially exhibited at the **2023 Dutch Design Week**,
October 21-29 2023. Afterwards, Packet Run is available for exhibition at
festivals, conferences and cultural institutions. 

For questions and inquiries, please get in touch with [Lei
Nelissen](https://leinelissen.com).

## Repository

This repository aims to contain all software, hardware, designs and other pieces
that are used to construct Packet Run and to make it tick. 

This repository is split out into a couple different directories that track
various assets, bits and pieces:
* `./client`: Contains all software that is run directly on the terminal units
* `./designs`: Contains various designs, ranging from logos, designed copy to
  STL files for the CNC'ed and 3D-printed parts of the installation. 
* `./documentation`: Contains documentation for how the installation is built,
  compiled and operated. Find here, for instance:
  * [The architectural diagram for Packet Run](./documentation/architecture.md)
  * [The project planning until the 2023 DDW](./documentation/planning.md)
* `./server`: Contains all software that is run on the server

## Contributors
<img alt="Bureau Moeilijke Dingen" src="./docs/assets/bmd-logo.svg" height="48"
/>

Packet Run was designed and built by **Bureau Moeilijke Dingen**, an Eindhoven-based
design studio that stimulates self-expression and autonomy through technology.

These people from Bureau Moeilijke Dingen contributed to Packet Run:
* Tijs Duel (Design, Mechanical Engineering)
* Jort Band (Technology, Management)
* Lei Nelissen (Design, Project Management, Technology)

<br />

<img alt="SIDN" src="./docs/assets/sidn-logo.svg" height="48" />

Packet Run was based on [PathVis](https://github.com/SIDN/pathvis), an open
source tool that visualises traceroutes. PathVis was built by **SIDN Labs**, an
experimental group at the .NL domain registry focusing on experimental
technology at the core of the internet.

These people from SIDN Labs contributed to PathVis and Packet Run:
* Elmer Lastdrager
* Ralph Koning
* Caspar Schutijser
* Jelte Jansen

<br />

<img alt="SIDN Fonds" src="./docs/assets/sidn-fonds-logo.svg" height="48" />

Building Packet Run was made possible by a grant from **SIDN Fonds**, a public
fund that supports supports and strengthens the internet and its users. 