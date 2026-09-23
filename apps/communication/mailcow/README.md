# Mailcow

Sanitized Mailcow Compose example derived from a private homelab deployment.

## Files

- `compose.yaml` contains the pinned service images and expects Mailcow runtime configuration under `/home/mailcow/data`.
- `.env.example` contains placeholders only. Copy it to `.env` in Dockhand and replace every `replace-with-*` value.

## Deployment

The Compose file alone does not generate Mailcow's `data/` tree. Prepare that tree from the matching upstream Mailcow release, review the bind paths, then import `compose.yaml` and `.env` into Dockhand. Do not commit the resulting `.env`, certificates, mailbox data, database volumes, or backups.

The example disables Mailcow-managed Let's Encrypt because TLS termination and certificate delivery vary between installations. Adjust that choice before deployment.

## Validation

Render the configuration with `docker compose config` in a disposable validation environment. Deploy the real stack only through Dockhand.
