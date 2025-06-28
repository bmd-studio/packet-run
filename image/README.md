# Packet Run Image Generation

This directory contains the configuration and scripts for generating the Packet Run Raspberry Pi image using `rpi-image-gen`.

1. Install Podman (Desktop) if not already installed

## Building Images

### Client Image

To build the client image:

```bash
podman compose run build-client-image
```

### Server Image

To build the server image:

```bash
podman compose run build-server-image
```

The generated images will be available in the `deploy` directory.

## Configuration

### Layers

The image is built using layers defined in YAML files:

- `base.yaml`: Common setup including:
  - Node.js repository configuration
  - Tailscale repository configuration
  - Service templates
  - Base packages

- `client.yml`: Client-specific configuration:
  - Kiosk service setup
  - Hall sensor server setup
  - Client-specific packages

- `server.yml`: Server-specific configuration:
  - Server service setup
  - Server-specific packages

### Profile

The `packet-run-client` profile defines the order of layers to apply:
1. Base Debian system
2. Raspberry Pi specific layers
3. Packet Run base layer
4. Packet Run client layer

### Configuration File

The main configuration file `packet-run-client.cfg` includes:
- Base Debian configuration
- Profile selection
- Build options

## Development

To modify the image:
1. Edit the appropriate layer file in `config/meta/packet-run/`
2. Update the profile if adding new layers
3. Rebuild the image using the commands above
