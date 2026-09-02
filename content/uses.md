---
title: "Uses"
description: "The hardware, editors, languages, and tools I actually work with day to day."
---

<!--
  SCAFFOLD NOTES — delete this block once you have been through the page.

  Everything below was taken from the machine and this repository, so the versions
  and tools are real. What I could not know is how you feel about any of it, so the
  prose is deliberately flat. It will read much better once it sounds like you.

  Worth adding, since I had no way to check:
    - Keyboard, monitor, headphones, desk, chair
    - Whichever of these you actually reach for first, and what you have given up on
    - Anything you use daily that lives in a browser tab rather than on disk
-->

A running list of what I work with. Adapted from the [uses.tech](https://uses.tech)
convention, and the natural successor to a post I wrote back in 2013 about the
[software I couldn't live without](/2013/11/software-that-i-couldnt-live-without./) —
which has aged about as well as you would expect.

**Last updated:** September 2026

## Machine

- **MacBook Pro (M4, 24 GB)** running macOS 26. <!-- confirm the model name; I only saw the identifier Mac16,1 -->
- **Homebrew** for anything that isn't in the App Store.

## Editor and terminal

- **[Visual Studio Code](https://code.visualstudio.com/)** — my main editor across every language below.
- **[iTerm2](https://iterm2.com/)** with **zsh**, where most of the actual work happens.
- **[Xcode](https://developer.apple.com/xcode/)**, for the Swift side of things — it is what [daymark](https://github.com/bryansray/daymark) is built in.
- **[Raycast](https://raycast.com/)** for launching and switching, and **[Obsidian](https://obsidian.md/)** for notes.

## Languages and runtimes

- **[TypeScript](https://www.typescriptlang.org/)** on **Node 26**, managed with **nvm**. **pnpm** for packages, with **bun** around for the things it is faster at.
- **[C#](https://learn.microsoft.com/dotnet/csharp/) / .NET 10** — the ecosystem I have spent the most career time in.
- **[Python](https://www.python.org/) 3.13**, managed with **pyenv**, with **uv** for environments and installs.
- **[Ruby](https://www.ruby-lang.org/)** via **rbenv**. The oldest posts on this site are Merb and rSpec, so it goes back a while.
- **[Swift](https://www.swift.org/)** for small macOS tools.

## Frameworks and libraries

- **[React](https://react.dev/)** for the majority of front-end work.
- **[SolidJS](https://www.solidjs.com/)** and **SolidStart** — what [Neighborly](https://neighborly.bryanray.net/) is built on.
- **[ASP.NET Core](https://learn.microsoft.com/aspnet/core/)** and **Entity Framework Core** on the .NET side. <!-- confirm: I inferred these from .NET being installed -->
- **[PostgreSQL](https://www.postgresql.org/)** and **SQLite** for storage, with **Docker** when something needs isolating.

## AI tools

- **[Claude](https://claude.ai/)**, including **[Claude Code](https://claude.com/claude-code)** in the terminal — a good deal of this site's recent rebuild went through it.
- **[ChatGPT](https://chatgpt.com/)**, mostly for a second opinion.

## Everyday utilities

- **[git](https://git-scm.com/)** with the **[GitHub CLI](https://cli.github.com/)** for pull requests and CI.
- **[just](https://github.com/casey/just)** as a task runner. Every project I keep ends up with a justfile.
- **[ripgrep](https://github.com/BurntSushi/ripgrep)** and **[fzf](https://github.com/junegunn/fzf)**, constantly.
- **[Moom](https://manytricks.com/moom/)** for window management — [still worth the money](/2018/11/window-management-with-moom/).
- **[1Password](https://1password.com/)** for credentials.

## This site

- **[Hugo](https://gohugo.io/) (extended)** — extended specifically, because the image
  processing encodes WebP and the standard build cannot.
- Plain **CSS** bundled through Hugo Pipes. No SCSS, no framework, and about forty
  lines of JavaScript in total.
- **Muli** as the typeface, self-hosted as WOFF2.
- Built by **GitHub Actions** and deployed to **Linode Object Storage** behind
  **Cloudflare**. There is a [whole post about that](/2026/08/rebuilding-my-personal-site-hugo-linode-object-storage-and-cloudflare/).
- The source is [on GitHub](https://github.com/bryansray/bryanray.net).
