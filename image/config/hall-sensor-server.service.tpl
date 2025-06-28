[Unit]
Description=Hall Sensor Server Service
After=network.target overlayfs-check.service gpio-setup.service
Requires=overlayfs-check.service gpio-setup.service

[Service]
Type=simple
User=<SERVICE_USER>
WorkingDirectory=/opt/packet-run/client/hall-sensor-server
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target 