# wg-easy

WireGuard server and management UI based on wg-easy. The example publishes the WireGuard UDP endpoint and the administration UI separately and stores keys/configuration under `${DATA_ROOT}`.

Copy `.env.example` to a private `.env`, set a public `WG_HOST`, choose a strong initial password and create the external `frontend` network. Protect the UI with firewall rules or a trusted reverse proxy. Deploy and update through Dockhand; never commit the populated `.env` or generated WireGuard keys.
