---
title: "What Building an MCP Server Taught Me About Designing for Models"
date: 2026-09-21T09:00:00-05:00
draft: true
tags: ["ai", "mcp", "python"]
---

<!--
  OUTLINE — this post is yours to write; delete this block when you have.

  The through-line: designing tools for a model is a different job from
  designing an API for a person. Every section below is a lesson that came out
  of a real change in corva-cli, with the changelog entry that proves it, so
  the post stays concrete rather than becoming another "MCP explained" piece.

  Audience: engineers and technical founders who are building, or thinking
  about building, an MCP server or agent tooling on top of their own platform.
  That overlaps with the people /work is written for, which is why the post
  ends with a quiet link there.

  Before publishing:
    - Check with Corva that describing the server at this level is fine. The
      outline sticks to design lessons and avoids internal endpoints, data
      shapes, and customer details. Keep it that way while writing.
    - Confirm the numbers (started March 2026, 70+ tools, ~280 commits) are
      still right when you publish.
    - Section 6 assumes the "asset status is well-only" fix (0.20.0) was a
      tool-description change. Confirm or swap in a different example.

  Target length: 1,500–2,000 words. Code snippets are optional; one small
  before/after of a tool description (section 6) would do more than a lot of
  architecture code.
-->

## Intro

- Hook: In March I started a small Python CLI for poking at our platform's APIs.
  Six months later it is an MCP server with 70-some tools that engineers and AI
  assistants use every day.
- The surprise: the hard parts weren't the protocol. They were the same
  questions you ask designing any interface, answered for a very different
  reader.
- One line on context: what Corva does (real-time drilling data), with no
  internal details.

## 1. Build the CLI first

- The MCP server sits on the same client layer as the CLI. Handlers stay thin:
  validate input, call a shared service, shape a stable result.
- Why it mattered: when a model does something strange, you can run the same
  call from your terminal and see exactly what it saw.
- Takeaway: your MCP server is a second front door, not a separate app.

## 2. The reader has a small context window

- Models pay for every field you return. Full documents crowd out reasoning.
- Examples from the changelog: sparse, discoverable fields for asset and well
  search (0.21.0, 0.25.0); returning compact references instead of whole
  records.
- Takeaway: design responses the way you'd design a mobile API. Project,
  paginate, summarize.

## 3. Put guardrails in the tool, not the prompt

- A model will happily write a query that times out or scans everything.
- Examples: guarding dataset queries with live index metadata (0.17.0);
  hard-bounded time windows after unbounded aggregations timed out against the
  live API; preview and recommend tools that help the model build a valid
  query before running it.
- Takeaway: the tool should make the expensive mistake impossible, not just
  discouraged.

## 4. Auth is the hard part

- Two modes: local settings for a developer's machine, and passthrough auth
  when the server runs remotely and acts as the caller. Then OAuth for remote
  clients (0.23.0).
- The lesson worth the whole section: never cache a client that carries a
  caller's credentials. A cache that is fine for one user leaks authority
  between users.
- Takeaway: decide whose identity every request runs as, and make that
  explicit in the code.

## 5. You can't improve what you can't see

- OpenTelemetry spans around every tool call, enriched with caller identity
  (0.18.0), error details (0.19.0), and transport (0.22.0).
- What the telemetry showed: which tools models actually reach for, which ones
  fail, and which ones nobody uses. (Fill in one real, non-sensitive finding.)
- Takeaway: instrument tools like production endpoints, because they are.

## 6. Tool descriptions are product copy

- The model only knows what a tool does from its name, description, and
  schema. A misleading description is a bug.
- Example: clarifying that asset status only applies to wells (0.20.0).
  Show a before/after of the description.
- Takeaway: review tool descriptions with the same care as a public API's docs.

## 7. Building it with agents

- Much of the server was written alongside AI coding agents: an AGENTS.md with
  the architecture and rules, repo-local skills, a local task tracker, and an
  independent review agent on every non-trivial change.
- Honest note on what worked and what didn't. (Yours to fill in.)
- Takeaway: the guidance you write for an agent is the same guidance a new
  teammate needs.

## Closing

- Recap the six lessons as a short list.
- Soft CTA, one or two sentences: if you're building tooling like this for your
  own product and want help, [here's how I work with teams](/work/).
