[Unit]
Description=Packet Run Kiosk
After=network.target hall-sensor-server.service
Requires=hall-sensor-server.service

[Service]
Type=simple
User=<SERVICE_USER>
ExecStart=/opt/packet-run/client/boot_packet_run.sh
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target 