from pathlib import Path
import struct
import zlib


root = Path("assets/teamspeak")
icons = [
    (root / "channel-minecraft.png", root / "channel-minecraft-ts6.png"),
    (root / "channel-cs2.png", root / "channel-cs2-ts6.png"),
    (root / "channel-wot.png", root / "channel-wot-ts6.png"),
    (root / "channel-repo.png", root / "channel-repo-ts6.png"),
    (root / "server-logo-64-base.png", root / "server-logo-ts6.png"),
]

for source, target in icons:
    data = source.read_bytes()
    iend = data.rfind(b"\x00\x00\x00\x00IEND")
    if iend < 0:
        raise RuntimeError(f"IEND chunk not found in {source}")

    for marker in range(100_000):
        payload = f"ts6-refresh\x00{marker}".encode()
        chunk_type = b"tEXt"
        chunk = (
            struct.pack(">I", len(payload))
            + chunk_type
            + payload
            + struct.pack(">I", zlib.crc32(chunk_type + payload) & 0xFFFFFFFF)
        )
        result = data[:iend] + chunk + data[iend:]
        crc = zlib.crc32(result) & 0xFFFFFFFF
        if crc < 2**31:
            target.write_bytes(result)
            print(f"{source.name} crc={crc} size={len(result)} path={target}")
            break
    else:
        raise RuntimeError(f"Could not produce signed-safe CRC32 for {source}")
