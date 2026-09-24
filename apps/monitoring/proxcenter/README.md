# ProxCenter

Portable ProxCenter example derived from the live Dockhand stack. It exposes the web UI, stores application data outside the container and joins pre-created `frontend` and `backend` networks.

Copy `.env.example` to a private `.env`, replace every secret and set the public URL. Create both external networks before importing `compose.yaml` into Dockhand. Keep `${DATA_ROOT}` backed up and do not publish the populated `.env`.

The image is pinned to the digest verified on the source system. Review upstream release notes and update the readable tag and digest together.
