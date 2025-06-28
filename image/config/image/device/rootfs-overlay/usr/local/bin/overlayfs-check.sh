#!/bin/bash

# Check if overlayfs is enabled
if ! grep -q "overlay" /proc/filesystems; then
    echo "OverlayFS not enabled. Enabling via raspi-config..."
    
    # Use raspi-config non-interactive mode to enable overlayfs
    if ! sudo raspi-config nonint enable_overlayfs; then
        echo "Failed to enable OverlayFS"
        exit 1
    fi
    
    # Reboot to apply changes
    echo "OverlayFS enabled. Rebooting to apply changes..."
    sudo reboot
fi

exit 0 