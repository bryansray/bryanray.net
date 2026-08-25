deploy_target := "bryan@bryanray.net:/var/www/bryanray.net/html"
rsync_flags := "-avz --delete"

# Linode Object Storage settings are supplied through the environment:
# LINODE_BUCKET, LINODE_ENDPOINT, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY.
object_storage_flags := "--acl public-read --delete"

default:
    @just --list

# Build the production site into public/.
build:
    hugo --noBuildLock

# Remove Hugo-generated output and cache files.
clean:
    rm -rf public resources .hugo_build.lock

# Serve the site locally.
serve:
    hugo server --noBuildLock

# Run the local development server with unpublished content included.
dev:
    hugo server --noBuildLock --environment development --buildDrafts --buildFuture --buildExpired

# Backwards-compatible long name for `dev`.
develop: dev

# Preview the files that would be deployed.
deploy-dry-run: build
    rsync {{rsync_flags}} --dry-run public/ {{deploy_target}} --exclude '.well-known/'

# Build and deploy the site.
deploy: build
    rsync {{rsync_flags}} public/ {{deploy_target}} --exclude '.well-known/'

# Preview the files that would be synchronized to Linode Object Storage.
deploy-object-storage-dry-run: build
    test -n "$LINODE_BUCKET" && test -n "$LINODE_ENDPOINT"
    aws --endpoint-url "$LINODE_ENDPOINT" s3 sync public/ "s3://$LINODE_BUCKET/" {{object_storage_flags}} --dryrun

# Build and deploy to a public Linode Object Storage bucket.
deploy-object-storage: build
    test -n "$LINODE_BUCKET" && test -n "$LINODE_ENDPOINT"
    aws --endpoint-url "$LINODE_ENDPOINT" s3 sync public/ "s3://$LINODE_BUCKET/" {{object_storage_flags}}

# Enable static website behavior on an existing bucket.
configure-object-storage:
    test -n "$LINODE_BUCKET" && test -n "$LINODE_ENDPOINT"
    aws --endpoint-url "$LINODE_ENDPOINT" s3api put-bucket-website --bucket "$LINODE_BUCKET" --website-configuration '{"IndexDocument":{"Suffix":"index.html"},"ErrorDocument":{"Key":"404.html"}}'
