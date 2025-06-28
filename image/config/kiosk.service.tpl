[Unit]
Description=Kiosk Browser Service
After=network.target overlayfs-check.service
Requires=overlayfs-check.service

[Service]
Type=simple
User=<SERVICE_USER>
Environment=XDG_RUNTIME_DIR=/run/user/<USER_ID>
ExecStart=/usr/bin/cage -- /usr/bin/chromium-browser --kiosk --noerrdialogs --disable-infobars http://localhost:3000
Restart=on-failure

[Install]
WantedBy=multi-user.target 