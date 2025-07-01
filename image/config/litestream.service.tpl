[Unit]
Description=Litestream Database Replication Service
After=network.target litestream-restore.service
Requires=litestream-restore.service
Wants=network-online.target

[Service]
Type=simple
User=<SERVICE_USER>
ExecStart=/usr/bin/litestream replicate
Restart=always

[Install]
WantedBy=multi-user.target 