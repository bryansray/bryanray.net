---
title: "What an MCP Server Taught Me About Designing for Models"
date: 2026-09-22T09:00:00-05:00
tags: ["ai", "mcp", "python"]
---

In March I started writing a small Python CLI for working with Corva's APIs. Corva is a real-time data platform for oil and gas drilling, and I wanted something I could point at an asset or a dataset without opening a browser. Six months later, that CLI also runs an MCP server with more than seventy tools, and the people using it are as often AI assistants as engineers.

The protocol turned out to be the easy part. Model Context Protocol is a reasonable specification, and the Python tooling around it does most of the mechanical work. What took real thought was something less obvious: a tool exposed to a model is an interface, and the thing reading that interface is not a person. It cannot ask what you meant. It pays for every field you hand back. It takes your descriptions completely literally.

Most of what I learned falls out of that one difference.

## Build the CLI first

The MCP server and the CLI sit on the same client layer. A tool handler stays thin: validate the input, call a shared service, shape a stable result. Nothing about the business of talking to the platform lives in the MCP layer itself.

I did not plan this as a strategy. The CLI simply existed first, and adding a second entry point to the same code was less work than building something new. But it turned out to be the most useful decision in the project, because it makes model behavior debuggable.

When an assistant does something strange, the question is always the same: did the tool return something wrong, or did the model misread something correct? With a CLI in front of the same code, I can run the call myself and see exactly what the model saw. Without that, I would be reading transcripts and guessing.

An MCP server is a second front door to your product, not a separate application. Treating it as one keeps the surface honest.

## Descriptions are part of the interface

The clearest lesson came from a bug where nothing was wrong with the code.

Our asset search accepts a status filter. Assets, though, are not all the same kind of thing: wells have a lifecycle status, while rigs and programs do not. Filtering a rig by status silently matches nothing. The behavior was correct and documented nowhere the model could see it, because the tool's description said only "asset lifecycle statuses."

The fix changed no logic at all. It changed a sentence. The new description says the status applies to wells, states plainly that non-well asset types have no status and will not match the filter, and leaves the rest of the guidance alone.

For a human developer, that missing sentence is a documentation gap. They would try it, get an empty list, wonder why, and go read the API docs or ask someone. A model does none of that. It takes the description at face value, gets an empty result, and reports that there are no matching rigs. The tool did exactly what it said. What it said was incomplete.

So descriptions are not comments. They are the part of the interface the model actually reads, and a misleading one is a defect in the same sense a wrong return value is. We have tests that assert the description text, which sounds strange until you have shipped this bug once.

## Budget for a small context window

A model pays in tokens for every field you return, and those tokens come out of the same budget it needs for reasoning about the answer. A generous response is not generosity. It is crowding.

Most of the tuning in this project has been in that direction: returning fewer fields by default, offering a way to ask for more, and giving the model a way to discover which fields exist rather than guessing. Search results return a compact projection. Anything large is paginated or summarized rather than handed back whole.

The mental model I settled on is designing for a mobile client on a bad connection. Project, paginate, summarize. It is a familiar discipline, applied to a reader most of us have not designed for before.

## Put the guardrails in the tool

A model will write a query that scans everything, and it will do so confidently. It has no sense of what a query costs.

You can ask it not to. Prompts and tool descriptions can say "keep the time range small," and much of the time that works. But "much of the time" is not a guarantee, and the failure mode is a slow query against a production system.

The more durable approach is to make the expensive mistake structurally impossible. Expensive queries take a bounded time window rather than trusting one to be supplied. Dataset queries are checked against live index metadata before they run, so a query that would not use an index gets a useful error instead of a timeout. There are tools whose entire job is to let a model preview or shape a query before executing it.

The general form: if a mistake would hurt, do not document it away. Make the tool refuse.

## Decide whose identity a call runs as

This is the part I would think about first if I started again.

The server runs in two very different situations. On a developer's machine, it uses local settings and acts as that developer. Running remotely, it acts on behalf of whoever is calling, with OAuth handling authentication for remote clients.

That second case changes what "a cached client" means. Caching a connection is ordinary good practice, and in a single-user CLI it is free. In a multi-caller server, a cached client that carries someone's credentials is a way for one person's access to leak into another person's request. It is the same optimization, and in one context it is harmless while in the other it is a security bug.

So we have a rule: never cache a client that carries a caller's credentials. More generally, every request should have an obvious answer to the question of whose authority it runs under, and that answer should be visible in the code rather than inferred.

## Closing

A tool is an interface, and the model on the other side is a reader with its own needs. It cannot ask what you meant, it pays for every field you send, and it takes your descriptions at their word. Design for that reader, and most of the problems above never come up.

If you are building this kind of tooling for your own product and could use a hand, [here's how I work with teams](/work/).
