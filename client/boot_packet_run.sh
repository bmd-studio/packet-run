# Check if there are git updates to the repository
git fetch origin || true
git pull || true

# Export all config entries in packet_run_config.txt as environment variables
export $(grep -v '^#' /boot/packet_run_config.txt | xargs)

# Generate the origin
ORIGIN="http://$PACKET_RUN_SERVER_IP:3000"

# Then, launch Chromium based on those variables
chromium-browser "$ORIGIN/router/$PACKET_RUN_TERMINAL_ID" \
    --start-fullscreen \
    --unsafely-treat-insecure-origin-as-secure=$ORIGIN \
    --hide-crash-restore-bubble \
    --test-type