# CLAUDE.md

Guidance for Claude Code working in this repository.

## Start here

**Read [AGENTS.md](AGENTS.md) first.** It is the canonical contributor guide for this
repo and covers project layout, editing guidelines, validation, and commit
conventions. Everything in it applies to Claude Code; this file only adds
Claude-specific notes and quick reference.

## Quick reference

Hugo **Extended** is required: the site encodes WebP through Hugo's image
processing, which the standard edition cannot do. Styles are plain CSS bundled
with `css.Build` — there is no SCSS. Task running is done with
[`just`](https://github.com/casey/just):

```sh
just serve   # local server
just dev     # local server incl. drafts, future, and expired content
just build   # production build into public/
just clean   # remove public/, resources/, .hugo_build.lock
```

Deployment recipes (`just deploy`, `just deploy-object-storage`) exist but are
**not** to be run by Claude — see below. `DEPLOYMENT.md` documents the Linode
Object Storage setup.

## Working agreements

- Validate with `just build` (equivalent to `hugo`) before finishing. If Hugo is
  not installed, say so plainly rather than skipping validation silently.
- Never commit `public/`, `resources/`, or `.hugo_build.lock`.
- Do not run deploy recipes or `rsync`/`aws s3 sync` against production. Deploying
  is Bryan's call; propose it, do not perform it.
- Do not commit or push unless asked.
- Match the front matter, permalinks, and partial/CSS structure already in place
  rather than introducing new patterns.
- Commit messages follow Conventional Commits, as specified in AGENTS.md.

## Layout at a glance

| Path | Purpose |
| --- | --- |
| `config.toml` | Site metadata, menus, permalinks, output options |
| `content/` | Markdown pages, posts, videos |
| `layouts/` | Templates and partials |
| `assets/css/` | CSS bundled through Hugo Pipes (`css.Build`) |
| `assets/images/` | Images that go through Hugo's image processing |
| `static/` | Files copied verbatim into the build |
| `data/books.yaml` | Bookshelf data |
| `cloudflare/` | Cloudflare configuration |
| `.github/workflows/` | Object Storage deploy workflow |
