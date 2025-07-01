#!/usr/bin/env bash

printf '  ____   _    ____ _  _______ _____   ____  _   _ _   _ \n'
printf ' |  _ \ / \  / ___| |/ / ____|_   _| |  _ \| | | | \ | |\n'
printf ' | |_) / _ \| |   | '\'' /|  _|   | |   | |_) | | | |  \| |\n'
printf ' |  __/ ___ \ |___| . \| |___  | |   |  _ <| |_| | |\  |\n'
printf ' |_| /_/   \_\____|_|\_\_____| |_|   |_| \_\\\___/|_| \_|\n\n'

printf 'Booting...\n'
                                                        
# Check if there are git updates to the repository
# git fetch origin || true
# git pull || true

# Export all config entries in packet_run_config.txt as environment variables
export $(grep -v '^#' /boot/firmware/packet_run_config.txt | xargs)

# Generate the origin
ORIGIN="http://$PACKET_RUN_SERVER_IP:3000"

# Create a Chrome policy that allows access to the serial ports
POLICY="{\"SerialAllowAllPortsForUrls\":[\"$ORIGIN\"]}"
sudo mkdir -p /etc/chromium/policies/managed
echo "$POLICY" | sudo tee /etc/chromium/policies/managed/policy.json >/dev/null

# Wait for the origin to become available
printf 'Waiting for network connection'
until $(curl --output /dev/null --silent --head --fail $ORIGIN); do
    printf '.'
    sleep 5
done
printf '\nHost was found and available! Launching Packet Run...\n'

# Then, launch Chromium based on those variables
/usr/bin/cage -- /usr/bin/chromium-browser "$ORIGIN/router/$PACKET_RUN_TERMINAL_ID" \
    --start-fullscreen \
    --unsafely-treat-insecure-origin-as-secure=$ORIGIN \
    --hide-crash-restore-bubble \
    --test-type \
    --ozone-platform=wayland \
    --disable-cursor \
    --kiosk