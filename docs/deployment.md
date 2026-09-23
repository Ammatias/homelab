# Deployment

This repository contains sanitized templates. It does not contain production `.env` files, credentials, runtime data, or an automatically synchronized copy of the live environment.

## Requirements

- a Linux host with Docker Engine;
- Dockhand connected to the target through Hawser;
- external Docker networks required by the selected stack;
- a private location for environment values and credentials.

## Recommended workflow

1. Clone the repository on an administration workstation.
2. Select one service under `apps/<category>/<service>`.
3. Copy `.env.example` to a private working file and replace every placeholder.
4. Review bind mounts, domains, networks, image versions, and resource limits for the target host.
5. Create or update the stack through Dockhand.
6. Save the Compose source with restart disabled, then deploy it as a separate operation.
7. Compare the source retained by Dockhand with the working copy delivered to Hawser.
8. Verify container health, logs, and application-specific checks.

Do not run these examples unchanged against a production host. Paths and network names are illustrative and may not match another environment.

## Storage paths

Portable examples use `${DATA_ROOT:-./data}` for service state and `${MEDIA_ROOT:-./media}` for shared media. The relative defaults are suitable for local evaluation. In Dockhand, set these variables to the intended absolute host directories, such as `/home/<service>`, so persistent data remains outside Hawser's stack working copy.

System mounts such as the Docker socket, `/lib/modules`, `/etc/localtime`, and Docker container logs remain explicit when the application requires host integration. Review each of these mounts before deployment because they grant capabilities beyond ordinary application storage.

## Networks

Most examples expect external `frontend` and/or `backend` networks. Create and manage them explicitly for the target environment before deploying dependent stacks.

## Secrets

Keep real `.env` files, passwords, tokens, private keys, database dumps, and internal infrastructure notes outside this public repository. If a secret is committed, removing the current file is not enough: rotate the value and remove it from Git history where appropriate.
