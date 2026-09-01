---
title: "daymark: Apple Calendar from the Command Line"
date: 2026-04-05T09:00:00-05:00
tags: ["swift", "macos", "cli", "apple-calendar"]
---

I built [daymark](https://github.com/bryansray/daymark), a small macOS command-line tool for reading Apple Calendar data from the terminal.

It can list calendars, show or search events within a date range, and return either human-readable output or JSON for use in scripts. It talks directly to Apple Calendar through EventKit, so there is no server or external calendar service involved.

Daymark is also a practical way for me to learn more Swift. I kept the code modular and straightforward, with the command-line app, core models, and Apple-specific integration separated into their own targets.

[View daymark on GitHub →](https://github.com/bryansray/daymark)
