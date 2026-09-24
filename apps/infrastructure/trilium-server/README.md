# Trilium sync server

Independent TriliumNext server instance for synchronization or a second knowledge base. This example mirrors the separate production stack rather than combining its data with the primary Trilium instance.

Copy `.env.example` to `.env`, create the external `backend` network and import the stack through Dockhand. Restrict the published port or route it through a trusted reverse proxy. Back up `${DATA_ROOT}` before upgrades.
