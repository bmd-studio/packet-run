[Unit]
Description=Litestream Database Restore Service
After=network.target
Before=packet-run-server.service
Requires=network-online.target

[Service]
Type=oneshot
User=<SERVICE_USER>
ExecStart=/usr/bin/retry -d 30 /usr/bin/litestream restore -config /etc/litestream.yml /opt/packet-run/server/packages/backend/data/packet-run.db
RemainAfterExit=yes
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target 