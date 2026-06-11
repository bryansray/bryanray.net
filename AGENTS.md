# AGENTS.md

## Project Overview

This repository is a Hugo-powered personal site for `bryanray.net`.

- `config.toml` contains site metadata, menus, permalinks, analytics, and Hugo rendering options.
- `content/` contains Markdown pages, posts, and videos.
- `layouts/` contains Hugo templates and partials.
- `assets/scss/` contains SCSS compiled through Hugo Pipes.
- `static/` contains files copied directly into the generated site.
- `data/books.yaml` powers the bookshelf content.

Generated output should stay out of version control. Do not commit `public/`, `resources/`, or `.hugo_build.lock`.

## Local Development

Use Hugo Extended because the site compiles SCSS through Hugo Pipes.

```sh
hugo server
```

Build the production site with:

```sh
hugo
```

Before handing off changes, run `hugo` to catch template, content, and asset-pipeline errors. If Hugo is not installed, note that clearly in the handoff.

## Editing Guidelines

- Keep changes small and aligned with the existing Hugo structure.
- Prefer existing partials and SCSS files before adding new templates or stylesheets.
- Use TOML-aware edits for `config.toml` and YAML-aware edits for `data/books.yaml` when possible.
- Keep Markdown front matter consistent with nearby content. Existing posts use YAML front matter with `title`, `date`, and optional `tags`.
- Preserve established permalinks and content paths unless the task explicitly requires a URL change.
- Put static assets that should be copied as-is under `static/`; put SCSS source files under `assets/scss/`.
- Avoid committing generated assets unless they are source assets intentionally stored in `static/`.

## Validation

For most changes, run:

```sh
hugo
```

For visual or layout changes, also run:

```sh
hugo server
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
