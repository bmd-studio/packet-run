[Unit]
Description=Kiosk Browser Service
After=network.target overlayfs-check.service
Requires=overlayfs-check.service

[Service]
Type=simple
User=<SERVICE_USER>
Environment=XDG_RUNTIME_DIR=/home/<SERVICE_USER>
Environment=WLR_RENDERER_ALLOW_SOFTWARE=1
ExecStart=/opt/packet-run/client/boot_packet_run.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target 