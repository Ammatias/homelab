# GML Launcher

Four-service GML Launcher example: API, reverse proxy, web client and skin/texture service. Persistent project files, backups and textures live below `${DATA_ROOT}`; the internal database uses a named volume.

Copy `.env.example` to a private `.env`, replace the security key and example URLs, then import the stack into Dockhand. Back up both `${DATA_ROOT}` and the `gml-system-data` volume. The image tags and digests reflect the tested `v2025.3.3` deployment and should be updated together.
