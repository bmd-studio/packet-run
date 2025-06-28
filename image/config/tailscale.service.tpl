[Unit]
Description=Tailscale VPN Service
After=network.target network-online.target overlayfs-check.service
Requires=overlayfs-check.service network-online.target

[Service]
Type=oneshot
User=<SERVICE_USER>
ExecStart=/bin/sh -c 'export $(grep -v "^#" /boot/firmware/packet_run_config.txt | xargs); /usr/bin/tailscale up --authkey=${TAILSCALE_AUTH_KEY} --login-server=${TAILSCALE_LOGIN_SERVER} --hostname=packet-run-${PACKET_RUN_TERMINAL_ID}'
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target 