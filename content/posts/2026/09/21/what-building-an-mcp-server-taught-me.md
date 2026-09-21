---
title: "What an MCP Server Taught Me About Designing for Models"
date: 2026-09-21T09:00:00-05:00
draft: true
tags: ["ai", "mcp", "python"]
---

<!--
  OUTLINE — this post is yours to write; delete this block when you have.

  Thesis: designing tools for a model is a different job from designing an API
  for a person. Most sections are tied to a real change in corva-cli, so the
  post stays concrete rather than becoming another "MCP explained" piece.

  Audience: engineers and technical founders building an MCP server or agent
  tooling on top of their own platform.

  Before publishing:
    - Check with Corva that describing the server at this level is fine.
    - Keep it at design level. Don't name internal services or datasets, show
      real response schemas, describe how credentials are carried (headers,
      cookies, service keys), or link the repo if it is private.
    - Update `date` to the publish date.

  Target length: 1,500–2,000 words. The only code worth including is the
  before/after in section 2.

  Cut from this post: building the server with coding agents (AGENTS.md,
  skills, review agents). It's a different topic for a different reader, and
  it would make a good post of its own.
-->

## Intro

<!-- Delete this heading when writing; posts here open with prose. -->

- Open on the status-filter bug from section 2: nothing in the code was
  wrong; the tool's description was. Tell it the way it actually showed up.
- State the thesis: designing tools for a model is a different job from
  designing an API for a person. The protocol was the easy part.
- Context in one line: Corva is a real-time data platform for oil and gas
  drilling. In March 2026 I started a small Python CLI for Corva's APIs; six
  months later it is an MCP server with 70-some tools.

## 1. Build the CLI first

- The MCP server sits on the same client layer as the CLI. Handlers stay thin:
  validate input, call a shared service, shape a stable result.
- When a model does something strange, you can run the same call from your
  terminal and see exactly what it saw.
- The MCP server is a second front door, not a separate app.

## 2. Write tool descriptions like product copy

- A misleading description is a bug, and fixing it is a real fix.
- The example (0.20.0): the status filter didn't say it only applies to wells,
  and rigs and programs have no status, so filtering them by status silently
  matches nothing. The fix changed no logic, only the parameter description:
  - Before: "Filter by one or more asset lifecycle statuses. Omit this
    parameter to include all statuses; never pass 'all'. Multiple values are
    combined as an OR filter."
  - After: "Filter by one or more well lifecycle statuses. Status applies only
    to wells; non-well asset types such as rigs and programs have a null
    status and will not match this filter. Omit this parameter to include all
    statuses; never pass 'all'. Multiple values are combined as an OR filter."
- The tests assert the description text, so descriptions are a tested
  contract, not comments.
- Add how you noticed it. The commit only shows the fix, not what a model did
  wrong.

## 3. Budget for a small context window

- Models pay in tokens for every field you return.
- Examples: sparse, discoverable fields for asset and well search (0.21.0,
  0.25.0). Name the mechanism when writing: a way to request only some
  fields, plus a way for the model to find out which fields exist.
- Design responses the way you'd design a mobile API: project, paginate,
  summarize.

## 4. Put guardrails in the tool, not the prompt

- Examples: aggregate query guardrails (0.16.0) and checking dataset queries
  against live index metadata before running them (0.17.0).
- Preview and recommend tools let the model check and shape a query before it
  runs. Name them as a category, not by their internal tool names.
- Bounded time windows on expensive queries. Tell the "unbounded queries timed
  out" story only if you remember it happening; the commit history doesn't
  record it.

## 5. Decide whose identity every call runs as

- Two modes: local settings on a developer's machine, and passthrough when
  the server runs remotely and acts as the caller. OAuth (0.12.0) is how
  remote clients authenticate.
- The design rule: never cache a client that carries a caller's credentials.
  A cache that is harmless for one user leaks access between users. Present
  it as a rule you designed for, not an incident.

## 6. Instrument tools like production endpoints

- Keep this section only if you have a real finding; otherwise cut it.
- OpenTelemetry spans around every tool call, with caller identity (0.18.0),
  error details (0.19.0), and transport (0.22.0).
- The finding should be about tools, not users: which tools models reach for,
  which fail, which nobody uses. Don't name customers, companies, or assets.

## Closing

<!-- Give this a real heading, or drop the heading and let it be the last paragraph. -->

A tool is an interface, and the model on the other side is a reader with its
own needs. It can't ask what you meant, it pays for every field you send, and
it takes your descriptions at their word. Design for that reader, and most of
the problems above never show up.

If you're building tooling like this for your own product and could use a hand,
[here's how I work with teams](/work/).
