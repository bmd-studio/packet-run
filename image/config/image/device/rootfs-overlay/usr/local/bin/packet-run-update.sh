#!/bin/bash

# Update script that handles overlayfs state and git updates

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "This script must be run as root"
    exit 1
fi

echo "Checking OverlayFS status..."

# Disable this service so it only runs once
systemctl disable packet-run-update.service

# Check if overlayfs is currently active
if grep -q "overlay" /proc/filesystems && mount | grep -q "overlay"; then
    echo "OverlayFS is active. Disabling OverlayFS and overlayfs-check service..."
    
    # Disable overlayfs via raspi-config
    if ! raspi-config nonint disable_overlayfs; then
        echo "Failed to disable OverlayFS"
        exit 1
    fi
    
    # Disable the overlayfs-check service
    if ! systemctl disable overlayfs-check.service; then
        echo "Failed to disable overlayfs-check service"
        exit 1
    fi
    
    echo "OverlayFS and service disabled. Rebooting to apply changes..."
    reboot
    exit 0
else
    echo "OverlayFS is not active. Updating git repository..."
    
    # Change to the packet-run directory
    cd /opt/packet-run || {
        echo "Failed to change to /opt/packet-run directory"
        exit 1
    }
    
    # Perform git pull
    if ! git pull; then
        echo "Failed to perform git pull"
        exit 1
    fi
    
    echo "Git repository updated successfully. Re-enabling overlayfs-check service..."
    
    # Re-enable the overlayfs-check service
    if ! systemctl enable overlayfs-check.service; then
        echo "Failed to enable overlayfs-check service"
        exit 1
    fi
    
    echo "Service re-enabled. Rebooting to apply changes..."
    reboot
    exit 0
fi 