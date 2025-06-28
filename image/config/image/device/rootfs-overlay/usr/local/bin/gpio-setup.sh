#!/bin/bash

# Wait for GPIO sysfs to be available
while [ ! -d /sys/class/gpio ]; do
    sleep 1
done

# Set up GPIO permissions
chgrp gpio /sys/class/gpio/export
chgrp gpio /sys/class/gpio/unexport
chmod 775 /sys/class/gpio/export
chmod 775 /sys/class/gpio/unexport

# Export GPIO 514 with retries
for i in {1..5}; do
    if echo "514" > /sys/class/gpio/export 2>/dev/null; then
        break
    fi
    sleep 1
done

# Set permissions for GPIO 514
if [ -d /sys/class/gpio/gpio514 ]; then
    chgrp -R gpio /sys/class/gpio/gpio514/
    chmod -R 775 /sys/class/gpio/gpio514/
fi 