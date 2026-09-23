# Bulwark Webmail

Sanitized Bulwark Webmail and legacy Mailcow bridge example.

## Deployment

1. Copy `.env.example` to `.env` in Dockhand and replace all secret placeholders.
2. Copy `providers.example.json` to a private deployment source if you need real domains or internal addresses; keep the public file generic.
3. Route the public webmail hostname to port 8083 and its JMAP endpoints to port 8084.
4. Deploy only through Dockhand.

This public example uses pinned upstream images. Private deployments may use locally built images for site-specific patches; those builds and operational secrets do not belong in `homelab`.
