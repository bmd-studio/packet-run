[Unit]
Description=Packet Run Server
After=network.target

[Service]
Type=simple
User=<SERVICE_USER>
WorkingDirectory=/opt/packet-run/server
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target 