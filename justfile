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
