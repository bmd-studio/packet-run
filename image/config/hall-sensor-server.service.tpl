[Unit]
Description=Hall Sensor Server
After=network.target

[Service]
Type=simple
User=<SERVICE_USER>
WorkingDirectory=/opt/packet-run/client/hall-sensor-server
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target 