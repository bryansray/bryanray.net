deploy_target := "bryan@bryanray.net:/var/www/bryanray.net/html"
rsync_flags := "-avz --delete"

default:
    @just --list

# Build the production site into public/.
build:
    hugo

# Remove Hugo-generated output and cache files.
clean:
    rm -rf public resources .hugo_build.lock

# Serve the site locally.
serve:
    hugo server

# Serve locally with drafts, future posts, and expired content enabled.
develop:
    hugo server --buildDrafts --buildFuture --buildExpired

# Preview the files that would be deployed.
deploy-dry-run: build
    rsync {{rsync_flags}} --dry-run public/ {{deploy_target}} --exclude '.well-known/'

# Build and deploy the site.
deploy: build
    rsync {{rsync_flags}} public/ {{deploy_target}} --exclude '.well-known/'
