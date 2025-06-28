#!/bin/bash

# Check if overlayfs is enabled
if ! grep -q "overlay" /proc/filesystems; then
    echo "OverlayFS not enabled. Enabling via raspi-config..."
    
    # Use raspi-config non-interactive mode to enable overlayfs
    raspi-config nonint enable_overlayfs
    
    # Reboot to apply changes
    reboot
fi

exit 0 