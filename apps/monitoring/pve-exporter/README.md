# Prometheus PVE Exporter

Prometheus exporter for Proxmox VE metrics.

## Requirements

- a dedicated, least-privilege Proxmox VE API user and token;
- an existing Docker network named `backend`;
- network access from the exporter to the Proxmox VE API;
- Dockhand connected to the target Docker host through Hawser.

## Configuration

Copy `pve.yml` to a private working location and replace the example user, token name, and token value. Keep TLS verification enabled and install the correct CA certificate when the Proxmox API uses a private CA.

The committed file contains placeholders only. Never commit a real API token.

## Deployment

Review `compose.yaml`, then import it into Dockhand. Store the populated configuration outside the public repository and set `PVE_EXPORTER_CONFIG` to its host path. Save the Compose source in Dockhand without restarting, deploy it separately, and compare the retained source with the Hawser working copy.

The exporter listens on port `9221`. Limit exposure to the monitoring network whenever a published host port is unnecessary.

## Validation

- confirm the container remains running without restart loops;
- request the exporter metrics endpoint from Prometheus;
- confirm expected Proxmox targets are up;
- verify logs contain no authentication or certificate errors.

## Updates and rollback

Record the working image version before an update. Test a new version in Dockhand and roll back to the previous tag or digest if collection fails. Back up the private configuration separately; it contains credentials.

Upstream: <https://github.com/prometheus-pve/prometheus-pve-exporter>
