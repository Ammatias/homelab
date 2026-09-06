# TeamSpeak 6 + TS6 Manager

Production-oriented TeamSpeak 6 voice server with a web manager, music bots, AFK automation, game-channel layout and a Guest verification flow.

This directory contains two independent Docker Compose stacks intended to be stored and deployed through Dockhand:

- `server/compose.yaml` — TeamSpeak 6 server;
- `manager/compose.yaml` — TS6 Manager, voice sidecar, YouTube PO Token provider and the request/onboarding controller.

The repository contains no real passwords, API keys, privilege keys or JWT/encryption secrets. Copy `.env.example` to a private `.env`, replace every placeholder and store sensitive values in Dockhand secret variables.

## Features

- TeamSpeak 6 server with persistent data and the external `frontend` network;
- TS6 Manager UI and internal WebQuery/SSH Query integration;
- permanent music bot for a dedicated music channel;
- on-demand music bot triggered by `!play <URL>` in selected channels;
- AFK mover that excludes bot and unverified Guest groups;
- restricted Guest group that remains in a silent lobby;
- private welcome message with a native `teamspeak://` confirmation button;
- one-time privilege key that promotes a confirmed user to `Verified`;
- server banner, icon and per-game channel icons.

## Layout

```text
teamspeak/
├── server/compose.yaml
├── manager/
│   ├── compose.yaml
│   ├── request-music-controller.mjs
│   └── ts6-url-validator.js
├── assets/
├── docs/
├── tools/prepare_ts_icons.py
└── .env.example
```

## Prerequisites

- Docker Engine with Compose support on the target node;
- Dockhand with a Hawser agent connected to that node;
- pre-created external Docker network named `frontend`;
- DNS record for `PUBLIC_TEAMSPEAK_HOST` pointing to the voice server;
- inbound `9987/udp` and `30033/tcp` for TeamSpeak;
- `3000/tcp` if the TS6 Manager UI should be reachable directly.

## Deployment with Dockhand

1. Copy `.env.example` to a private `.env` and generate strong values for `TSSERVER_QUERY_ADMIN_PASSWORD`, `JWT_SECRET` and `ENCRYPTION_KEY`.
2. Create a Dockhand environment for the target Hawser node.
3. Create the `teamspeak` stack from `server/compose.yaml` and its private environment values.
4. Create the `ts6-manager` stack from `manager/compose.yaml` and the same private environment source.
5. Place `request-music-controller.mjs` and `ts6-url-validator.js` in `${TS6_MANAGER_DATA_DIR}/request-bot/` on the target node before deploying the manager stack.
6. Confirm in Dockhand that both stacks are running and that every manager component joined `frontend`.

Do not run Compose directly on the target host when Dockhand owns the stack. Dockhand should remain the source of truth for `compose.yaml` and `.env`; `/home/teamspeak` should contain only persistent container data and mounted helper files.

## Initial TeamSpeak setup

After the server starts:

1. connect with the initial administrator privilege key shown in the server logs;
2. set the virtual-server password and default channel to the lobby;
3. create a permanent `Verified` server group with ordinary voice/chat/channel access;
4. remove ordinary permissions from the default Guest group and leave only `b_virtualserver_token_use=1`;
5. configure the lobby with sufficient talk power so Guests cannot speak;
6. configure game/category channels and upload the files from `assets/` through TeamSpeak File Transfer.

The implemented example uses game sections for Minecraft, Counter-Strike 2, World of Tanks and R.E.P.O., plus general, music and AFK channels. The category channels are separators and cannot be joined.

## TS6 Manager setup

Add the TeamSpeak connection to TS6 Manager using its internal Docker hostname on `frontend`. Keep WebQuery and SSH Query ports internal; they do not need to be published on the host.

Create two music bots:

- a permanent bot with autostart enabled for the music channel;
- a request bot with autostart disabled, started by the controller when `!play` is received elsewhere.

Create a dedicated `Bots` TeamSpeak server group and exclude it from AFK automation. Configure `ALLOWED_CHANNEL_IDS` with the voice-channel IDs where the request bot may appear.

For Guest onboarding, create a flow listening to `notifycliententerview` and POST the client ID to:

```text
http://request-music-controller:3100/onboard
```

Example body:

```json
{"clid":"{{event.clid}}"}
```

The controller issues a one-time privilege key for `VERIFIED_GROUP_ID` and sends it in a native TeamSpeak URI. The server password is obtained internally from the configured music bot and is never logged.

## Music dependencies

The manager stack expects executable `yt-dlp` and Deno files under `${TS6_MANAGER_DATA_DIR}/bin/`, plus the optional bgutil PO Token provider files shown in the Compose mounts. Pin and update these components deliberately; do not commit cookies or authenticated media-service sessions.

## Validation

Before deployment, validate both Compose files with private environment values and run:

```bash
node --check manager/request-music-controller.mjs
python -m py_compile tools/prepare_ts_icons.py
```

Then verify:

- a new identity starts in the lobby as Guest;
- the welcome message contains the confirmation button;
- the one-time key persists membership in `Verified` after reconnect;
- Guest cannot speak, chat, move to ordinary channels or access files before confirmation;
- the permanent music bot stays out of AFK;
- the request bot exits after its queue finishes.

More implementation details are available in `docs/`.
