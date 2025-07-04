[Unit]
Description=Packet Run Server Service
After=network.target overlayfs-check.service litestream-restore.service
Requires=overlayfs-check.service litestream-restore.service

[Service]
Type=simple
User=<SERVICE_USER>
WorkingDirectory=/opt/packet-run/server/packages/backend
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production
Environment=PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

[Install]
WantedBy=multi-user.target 