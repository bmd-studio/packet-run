#!/bin/bash
set -e

# Source the config file
. /boot/firmware/packet_run_config.txt

# Run tailscale
exec /usr/bin/tailscale up \
    --authkey="${TAILSCALE_AUTH_KEY}" \
    --login-server="${TAILSCALE_LOGIN_SERVER:-https://login.tailscale.com}" \
    --hostname="packet-run-${PACKET_RUN_TERMINAL_ID:-1}" 