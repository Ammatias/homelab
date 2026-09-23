# MTA-STS policy

Minimal static web service for publishing an SMTP MTA Strict Transport Security policy at `https://mta-sts.example.com/.well-known/mta-sts.txt`.

## Requirements

- a DNS record for the `mta-sts` hostname;
- HTTPS termination with a valid public certificate;
- an existing Docker network named `frontend`;
- a matching `_mta-sts.example.com` TXT record containing the policy ID.

## Configuration

Copy `.env.example` to a private working file if the default loopback bind or port is unsuitable. Replace `mail.example.com` in `.well-known/mta-sts.txt` with the hostname used by the domain's MX record.

Start with `mode: testing` and a short `max_age`. Verify HTTPS, certificate validation, DNS, and mail delivery reports before changing the policy to `mode: enforce` and increasing `max_age`.

## Deployment

Review `compose.yaml`, import it into Dockhand, save the source without restarting, and deploy it separately. Route only the `mta-sts` hostname to the published port. Compare the Compose source retained by Dockhand with the Hawser working copy after deployment.

## Validation

```text
GET https://mta-sts.example.com/.well-known/mta-sts.txt
```

The response must be HTTPS, return status 200, use `text/plain`, and exactly describe the intended MX hostnames. Keep the previous policy ID available for rollback until caches expire.

Reference: <https://www.rfc-editor.org/rfc/rfc8461>
