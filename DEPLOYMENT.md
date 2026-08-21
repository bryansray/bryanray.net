# Deploying to Linode Object Storage

This site can be deployed to Linode's S3-compatible Object Storage with the
AWS CLI. Keep the existing server deployment in place until the Object Storage
website URL and custom-domain TLS have both been verified.

## One-time Linode setup

1. Use the **E0** Object Storage bucket named `www.bryanray.net` in Atlanta
   (`us-southeast`).
   Custom domains are not supported on E2 or E3 endpoints, and the bucket name
   must exactly match the custom hostname.
2. Create a limited access key with read/write access to this bucket. Do not
   commit the key or secret.
3. The bucket's S3 endpoint is
   `https://us-southeast-1.linodeobjects.com`, and its website host is
   `www.bryanray.net.website-us-southeast-1.linodeobjects.com`.
4. Export the deployment settings in the shell:

   ```sh
   export AWS_PROFILE=bryanray-linode-object-storage
   export LINODE_BUCKET=www.bryanray.net
   export LINODE_ENDPOINT=https://us-southeast-1.linodeobjects.com
   ```

   The named AWS profile is stored in the local AWS credentials file and uses
   the `bryanray-net-deploy` key, which is restricted to read/write access on
   this bucket.

5. Enable website behavior, preview the upload, and deploy:

   ```sh
   just configure-object-storage
   just deploy-object-storage-dry-run
   just deploy-object-storage
   ```

The deploy uses `--delete`, so files removed from the generated Hugo site are
also removed from the bucket. The dry run is the safe way to inspect this first.

## Test before changing DNS

Open the bucket's website URL and verify the home page, a post, CSS/images, and
a nonexistent path (which should render `404.html`). The website URL differs
from both the S3 API endpoint and the ordinary bucket/file URL.

## Custom domain and TLS

Linode Object Storage does not support an apex/root custom domain. Use the
existing canonical hostname, `www.bryanray.net`:

1. Obtain a certificate covering `www.bryanray.net` and upload the certificate
   and private key on the bucket's SSL/TLS tab.
2. Change the `www` CNAME to the website hostname, for example:

   ```text
   www  CNAME  www.bryanray.net.website-us-southeast-1.linodeobjects.com.
   ```

3. Keep `bryanray.net` on a service that responds with a permanent redirect to
   `https://www.bryanray.net/`. Linode DNS cannot put a CNAME at the zone apex,
   and Object Storage cannot host the apex custom domain directly.

### Pre-cutover routing limitation

Direct custom-domain validation on August 20, 2026 confirmed that the uploaded
certificate is valid, but Linode's custom-hostname endpoint uses raw object
routing instead of the bucket's static-website routing. With the hostname forced
to the Object Storage endpoint, `/index.html` returns `200` while `/` returns
`403`. Directory-style Hugo URLs have the same problem. Do not change the
production `www` DNS record until an edge proxy or another host provides index
document routing for `/` and directory paths.

## Cloudflare edge proxy

The Cloudflare Worker `bryanray-site-proxy` runs the source in
`cloudflare/worker.js`. It proxies `www` to Linode's HTTP website endpoint so
index-document routing works, converts Linode's missing-object `403` response
to a proper `404`, and redirects the apex domain to `www`.

The Worker has these routes in the pending `bryanray.net` Cloudflare zone:

```text
bryanray.net/*
www.bryanray.net/*
```

The Worker preview URL is
`https://bryanray-site-proxy.bryansray.workers.dev`. Before activation it was
verified against the home page, a clean directory URL, a post, CSS, an image,
and a missing page.

Cloudflare assigned these authoritative nameservers:

```text
aaden.ns.cloudflare.com
isla.ns.cloudflare.com
```

Activation requires replacing the five Linode nameservers at Namecheap with
these two Cloudflare nameservers. The staged Cloudflare zone contains the five
Google Workspace MX records, SPF and ACME TXT records, the proxied apex and
`www` records, and DNS-only `equipmac` and `pve` A records.

Certificate renewal is not automatic merely because the certificate is stored
on the bucket. The `Renew Object Storage TLS certificate` GitHub Actions
workflow issues a fresh Let's Encrypt certificate with a Linode DNS-01
challenge on the first day of each month, validates it, then replaces the
certificate on this bucket. It
uses the repository secret `LINODE_TLS_TOKEN`, whose Linode API token is limited
to `domains:read_write` and `object_storage:read_write` scopes and expires on
August 20, 2027. Rotate the token and update the secret before that date.

## Rollback

Restore the current DNS records: the apex A record points to `96.126.112.76`,
and `www` is a CNAME to `bryanray.net`. DNS rollback does not require another
site build or upload.
