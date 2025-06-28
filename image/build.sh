#!/bin/bash

# Exit on any error
set -e

# Check if argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <server|client>"
    exit 1
fi

# Validate argument
if [ "$1" != "server" ] && [ "$1" != "client" ]; then
    echo "Error: Argument must be either 'server' or 'client'"
    exit 1
fi

# Get git commit SHA for versioning the output files
GIT_SHA=$(git rev-parse --short HEAD)

# Run the build using a heredoc for better readability
podman compose run --rm build-image sh -c '
    # Exit on any error
    set -e
    
    # Run the rpi-image-gen build script with appropriate config
    ./build.sh \
        -D ./packet-run \
        -c packet-run-'"$1"' \
        -o ./packet-run/my.options

    # Move the output files to the deploy directory
    mv /home/imagegen/rpi-image-gen/work/deb12-arm64-min/artefacts/deb12-arm64-min.* ./deploy/
'

# Rename the output files to include type and git SHA
for file in deploy/deb12-arm64-min.*; do
    if [ -f "$file" ]; then
        # Extract the file extension
        extension="${file##*.}"
        # Rename the file with the new format
        mv "$file" "output/packet-run-img-$1-$GIT_SHA.$extension"
    fi
done 