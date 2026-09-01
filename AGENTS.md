# AGENTS.md

## Project Overview

This repository is a Hugo-powered personal site for `bryanray.net`.

- `config.toml` contains site metadata, menus, permalinks, analytics, and Hugo rendering options.
- `content/` contains Markdown pages, posts, and videos.
- `layouts/` contains Hugo templates and partials.
- `assets/css/` contains the CSS bundled through Hugo Pipes (`css.Build`). There is no SCSS.
- `static/` contains files copied directly into the generated site.
- `data/books.yaml` powers the bookshelf content.

Generated output should stay out of version control. Do not commit `public/`, `resources/`, or `.hugo_build.lock`.

## Local Development

Hugo **Extended** is required: the site encodes WebP through Hugo's image
processing, which the standard edition cannot do.

Tasks run through [`just`](https://github.com/casey/just):

```sh
just serve   # local server
just dev     # local server incl. drafts, future, and expired content
just build   # production build into public/
just clean   # remove public/, resources/, .hugo_build.lock
```

Before handing off changes, run `just build` to catch template, content, and asset-pipeline errors. If Hugo is not installed, note that clearly in the handoff.

## Editing Guidelines

- Keep changes small and aligned with the existing Hugo structure.
- Prefer existing partials and stylesheets before adding new templates or CSS files.
- Use TOML-aware edits for `config.toml` and YAML-aware edits for `data/books.yaml` when possible.
- Keep Markdown front matter consistent with nearby content. Existing posts use YAML front matter with `title`, `date`, and optional `tags`.
- Preserve established permalinks and content paths unless the task explicitly requires a URL change.
- Put files that should be copied verbatim under `static/`; put CSS, JS, and any image that should go through Hugo's image processing under `assets/`.
- Avoid committing generated assets unless they are source assets intentionally stored in `static/`.

## Validation

For most changes, run:

```sh
just build
```

For visual or layout changes, also run:

```sh
just serve
```

Then inspect the affected pages locally before finishing.

## Conventional Commits

Use Conventional Commits for commit messages:

```text
type(scope): summary
```

Common types for this repo:

- `feat`: add a page, section, layout behavior, or visible site feature
- `fix`: correct broken content, layout, links, styling, or build behavior
- `docs`: update repository documentation or contributor guidance
- `style`: formatting-only changes that do not affect behavior or content meaning
- `refactor`: restructure templates, styles, or data without changing output intentionally
- `chore`: maintenance tasks, dependency/tooling updates, or repository housekeeping

Examples:

```text
docs: add agent maintenance guide
fix(posts): correct broken permalink
feat(bookshelf): add reading list data
```

Keep the summary imperative, lowercase after the type, and under about 72 characters when practical.
