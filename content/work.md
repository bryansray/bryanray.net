---
title: "Work with me"
description: "Async, monthly software help for indie SaaS and bootstrapped B2B teams. Senior full-stack engineering without the full-time hire."
layout: work

# SCAFFOLD — confirm these before publishing, then delete this comment.
#   - Build's hour range (20–25) was inferred from Care's rate; it was never
#     stated. Change it or drop the hours from both tiers.
#   - "Unused hours don't roll over" and "billed monthly in advance" are
#     assumptions. Say what you actually intend.
#   - `availability` is blank on purpose. Set it (e.g. "Taking two retainer
#     clients this quarter") and it renders under the hero buttons.
#   - The Corva projects are described at the level of a résumé. Check that
#     naming them is fine with Corva. StreamR is a personal experiment, not a
#     Corva product; if it was built on Corva time or hardware, confirm your IP
#     agreement doesn't cover it before calling it yours.

email: "bryan@bryanray.net"
calendar: "https://fantastical.app/bryanray/availability"
availability: ""

hero:
  eyebrow: "Work with me"
  heading: "A senior engineer for your product, without the full-time hire."
  lede: "Monthly, async help for indie SaaS and bootstrapped B2B teams. Work lands in Slack or Linear, you get written updates instead of standups, and the scope is clear before the month starts."

fit:
  for:
    - "You have a product in production with paying users."
    - "You need features, integrations, or internal tools, but not a full-time hire."
    - "Your stack is near Python, C#/.NET, React, TypeScript, or Postgres."
    - "You would rather read a written update or watch a Loom than sit in a meeting."
  notFor:
    - "Idea-stage products with no users yet."
    - "Equity-only or lowest-hourly-rate work."
    - "24/7 on-call or on-site engagements."
    - "Enterprise procurement and SSO requirements as the starting point."

steps:
  - title: "Discovery"
    text: "A 20-minute call, or written answers if you prefer. What you have, what hurts, and what done looks like."
  - title: "Pick a tier and a first outcome"
    text: "We agree on a tier and one concrete result for the first month, so you know what you are paying for."
  - title: "Work happens where you already are"
    text: "Slack or Linear. Written replies within one business day, Monday to Friday."
  - title: "A monthly summary"
    text: "What shipped, what is next, and anything I think you should know. Cancel any time after the current period."

tiers:
  - name: "Care"
    price: "$2,000"
    period: "/ month"
    hours: "Roughly 10–15 hours"
    summary: "Steady help for a product that mostly works."
    items:
      - "Small features, bug fixes, and integrations"
      - "Best-effort work from a shared queue"
      - "Async in Slack or Linear"
      - "Monthly written summary"
  - name: "Build"
    price: "$3,500"
    period: "/ month"
    hours: "Roughly 20–25 hours"
    summary: "Real shipping capacity for a product that needs to move."
    featured: true
    items:
      - "A prioritized backlog we keep together"
      - "One committed, meaningful ship every month"
      - "Loom walkthroughs when something lands"
      - "Everything in Care"
  - name: "Partner"
    price: "Custom"
    period: ""
    hours: "Scoped together"
    summary: "Deeper ownership when Build is not enough."
    items:
      - "Architecture and technical direction"
      - "Larger or longer-running projects"
      - "Shape and pace agreed up front"

sprint:
  heading: "Not ready for monthly? Start with a sprint."
  text: "A fixed, two-week engagement, usually $1,500–$3,000, with one defined deliverable. It is a low-risk way to see how we work together before committing to a retainer."

terms:
  included:
    - "Async communication in Slack or Linear"
    - "Written replies within one business day, Mon–Fri"
    - "A monthly summary of what shipped and what is next"
    - "You own all the code and work product"
    - "Billed monthly in advance, cancel any time after the current period"
  excluded:
    - "Standing meetings (Looms and ad-hoc calls when useful)"
    - "24/7 on-call"
    - "Equity-only arrangements"
    - "Rolling over unused hours"

proof:
  intro: "My day job is at Corva, a real-time data platform for oil and gas drilling. Two things I have built or worked on there, and one experiment of my own:"
  items:
    - title: "Corva CLI & MCP server"
      description: "A Python CLI and Model Context Protocol server that gives engineers and AI assistants direct, typed access to Corva's platform: assets, wells, rigs, apps, and datasets. Ships with schema validation and OpenTelemetry tracing."
      tags: ["Python", "MCP", "OpenTelemetry"]
    - title: "Predictive Drilling"
      description: "Contributed to a real-time streaming app on AWS Lambda that processes live rig telemetry, runs ML-driven optimization, and sends parameter recommendations back to rig control systems."
      tags: ["Python", "AWS Lambda", "ML", "Streaming"]
    - title: "StreamR & StreamR UI"
      description: "A personal experiment in streaming ingestion: Rust services that poll WITSML drilling-data sources, publish through NATS JetStream, and land time-series data in MongoDB, plus an operator UI for managing streams, connections, and mappings."
      tags: ["Rust", "NATS", "MongoDB", "SolidStart"]

audit:
  heading: "Run a marketing or creative agency?"
  text: "I also offer a fixed-price Agency Ops Audit for teams of about 5–30 people: a map of your lead → booked → delivered → paid workflow, three ranked automations, and a retainer proposal if it makes sense."
  price: "$1,000 · 5 days"

faq:
  - q: "Do we have to meet weekly?"
    a: "No. The default is async. I will send a Loom when showing is faster than telling, and we can talk when something genuinely needs a conversation."
  - q: "Can I start with a short paid sprint?"
    a: "Yes. Most sprints are $1,500–$3,000 for about two weeks, and many retainers start that way."
  - q: "What if my stack is different?"
    a: "Tell me what you use in discovery. Fit matters more than a matching list of buzzwords."
  - q: "Who owns the code?"
    a: "You do. Everything I write for you is yours."
  - q: "Is the audit only for agencies?"
    a: "For now, yes. Focusing on one kind of business is deliberate."
---

I'm Bryan Ray, a software engineer and technical leader. I've spent my career
turning messy business needs into working software: leading teams, designing
systems, and writing a great deal of the code myself.

I help indie founders and small teams ship without agency overhead or a
full-time hire. [More about me →](/about/)
