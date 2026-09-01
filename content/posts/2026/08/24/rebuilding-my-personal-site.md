---
title: "Rebuilding My Personal Site: Hugo, Linode Object Storage, and Cloudflare"
date: 2026-08-24T22:00:00-05:00
tags: ["this-site", "infrastructure"]
---

My personal site has been around in one form or another for a long time. Like a lot of personal projects, it accumulated history: old design decisions, old content, and infrastructure that continued running mostly because it had always been there.

The site itself was already built with Hugo, but it was hosted on a Linode VPS. That worked, but it also meant I was maintaining a server to publish a collection of static files. There was a web server to configure, an operating system to keep current, certificates to think about, and a deployment process that carried more machinery than the site really needed.

This overhaul started as a design project. It ended up becoming a useful reminder that simplifying one layer of a system can expose interesting problems in another.

## Deciding what the site should be

Before changing the infrastructure, I had to decide what I wanted the site to become.

For a while, the writing on the site leaned heavily toward leadership and management. That reflected what I was doing at the time, but it no longer felt like the best description of me. These days, I am much more interested in building things.

I wanted the site to feel like a developer's notebook: a place for software, open source projects, applications I have built, experiments, and the occasional moment from the rest of my life. It did not need to become a polished product or a narrowly focused technical publication. It needed to feel personal and leave room for curiosity.

That led to a new description for the site: **Code, Projects & Life**.

It also shaped the new home page. The central idea became:

> I build things, follow curiosities, and share the journey.

That sentence gave the redesign a useful center. It says what I do without pretending I only care about one category of work.

## Keeping Hugo instead of changing frameworks

I briefly considered rebuilding the site with SolidJS and SolidStart. I like Solid, and it would have made interactive components easy to build. But after looking honestly at the site, most of what it needs to do is render Markdown into fast, static HTML.

Hugo is exceptionally good at that.

It already understood the content archive. It preserved the existing URLs. It could generate feeds, taxonomy pages, and the rest of the site without introducing a JavaScript application runtime. Most importantly, writing a post could remain as simple as adding a Markdown file.

Interactive behavior did not require abandoning Hugo, either. A static site can still use JavaScript where it adds value. Navigation menus, disclosure widgets, theme controls, or small project demos can all be progressively enhanced without turning the entire site into a client-side application.

So I kept Hugo and overhauled the parts that actually needed attention: the templates, styles, content framing, and deployment pipeline.

## Redesigning the Hugo site

The visual redesign moved away from the old theme and toward something that felt more like a personal notebook. The typography became easier to scan, the home page became more intentional, and the site gained clearer places for writing, projects, and other things I may want to share later.

I also replaced the original green accent color with blue. That sounds like a small decision, but color does a surprising amount of work in a design. The blue feels calmer, a little more technical, and much more like me.

While working on the theme, I revisited the asset pipeline. The site had been using SCSS through Hugo Pipes, which required Hugo Extended. That dependency made sense when Sass provided conveniences that browsers and CSS did not. In this project, however, the SCSS was not doing anything that modern CSS could not handle directly.

I converted the styles to standard CSS and switched the templates to Hugo's `css.Build` pipeline. Hugo now bundles the styles, minifies them for production, and fingerprints the result. The generated filename includes a content hash, so a changed stylesheet gets a new URL automatically.

That allowed the project to use standard Hugo instead of Hugo Extended. It also gave the deployment a clean caching strategy: fingerprinted assets can be cached for a very long time because their URL changes whenever their contents change.

For local development, I added a `justfile`, so starting the site is now straightforward:

```sh
just dev
```

There are also recipes for production builds and the Object Storage deployment tasks. None of the individual commands are especially complicated, but giving them memorable names removes friction. That matters on a personal project that I might put down for several months before returning to it.

## A static site does not need a server

Once the Hugo overhaul was in good shape, the VPS started to look even more unnecessary.

Hugo produces a directory full of HTML, CSS, images, feeds, and other static assets. There is no database and no server-side application process. Linode Object Storage is a much more natural home for that output than a general-purpose virtual machine.

I created an Object Storage bucket named for the site's canonical hostname, `www.bryanray.net`, and configured it for static website hosting. A limited access key can write to that bucket without receiving broader access to the Linode account.

Deployment is an S3-compatible sync:

```sh
aws s3 sync public/ s3://www.bryanray.net/ --delete
```

The real command also supplies Linode's Object Storage endpoint and marks the uploaded objects as publicly readable. The `--delete` flag keeps the bucket aligned with Hugo's output, including removing files that no longer exist in the site.

That flag deserves respect. I added a dry-run recipe so I can inspect a deployment before making changes when working locally.

## The custom-domain wrinkle

The storage migration was conceptually simple, but custom-domain routing added a wrinkle.

Linode exposes both an object endpoint and a static website endpoint. The website endpoint understands index documents, so a request for `/posts/` can resolve to `/posts/index.html`. The custom-hostname path I tested behaved more like raw object storage: requesting `/index.html` worked, while requesting `/` returned a `403`.

That is a problem for a Hugo site because clean directory-style URLs are part of the appeal.

The solution was to put Cloudflare in front of the bucket and use a small Worker as an edge proxy. The Worker sends requests to Linode's static website endpoint, where index-document routing works correctly. It also handles two other details:

* Requests to the apex domain redirect to `www`.
* Missing objects returned by Linode as `403` become proper `404` responses.

The Worker is intentionally small. It is not an application server; it is a thin compatibility layer between a static website and the public hostname.

Moving DNS to Cloudflare required more care than changing a single web record. The zone also contained Google Workspace mail records, verification records, and hostnames for unrelated services. I staged the full zone in Cloudflare before changing the authoritative nameservers, then verified the site, email-related DNS, clean URLs, assets, and missing pages.

The migration also kept a rollback path. Until the new setup was proven, the old VPS and its DNS targets remained available.

## Automating deployment with GitHub Actions

With the hosting path settled, I added a GitHub Actions workflow that runs whenever code is pushed to `main`.

The workflow:

1. Checks out the repository.
2. Downloads a pinned version of standard Hugo.
3. Verifies the Hugo archive checksum.
4. Builds and minifies the site.
5. Synchronizes the generated files to Linode Object Storage.
6. Applies cache metadata to HTML and fingerprinted CSS.
7. Purges Cloudflare's cache after the upload succeeds.

The deployment credentials live in GitHub Actions secrets, not in the repository. The Linode key is limited to the site bucket. The Cloudflare token is limited to reading the `bryanray.net` zone and purging its cache.

Cloudflare manages the public TLS certificate at the edge. Because the Worker fetches Linode's HTTP website endpoint, a custom certificate stored on the bucket is not part of the production request path and does not require a separate renewal workflow.

## The successful deployment that looked unsuccessful

The first full deployment appeared to work perfectly. GitHub Actions was green. Hugo built the site. The sync output showed the new HTML and fingerprinted stylesheet being uploaded.

But the public site still looked old.

This is the kind of problem that can send you in the wrong direction if “the site did not update” is treated as a single failure. There were several independent layers involved:

```text
GitHub Actions → Hugo build → Linode Object Storage → Cloudflare Worker → browser
```

Checking them one at a time made the problem obvious.

The generated site was correct. The copy stored in the bucket was correct. Linode's website endpoint returned the new page. The Worker's preview URL returned the new page. Only the public hostname returned the old one.

The response headers told the rest of the story: Cloudflare reported a cache hit and served an object whose `Last-Modified` value predated the deployment. Adding a one-time query string produced a cache miss and immediately returned the new site.

The deployment had succeeded. The edge cache had not been invalidated.

I fixed that in two places. HTML now uses `no-cache`, which tells clients and intermediaries to revalidate it. Fingerprinted CSS and JavaScript can be cached as immutable for a year, while other static assets receive a shorter cache lifetime. The deployment workflow also purges Cloudflare after the Object Storage sync completes.

That combination gives the site the behavior I actually want: HTML updates appear immediately, while content-addressed assets remain aggressively cacheable.

## What I ended up with

The final architecture is small:

```text
Markdown
   ↓
Hugo
   ↓
Linode Object Storage
   ↓
Cloudflare Worker and CDN
   ↓
bryanray.net
```

There is still infrastructure, of course. “Serverless” rarely means “nothing to operate.” It means choosing managed pieces whose responsibilities match the problem.

The VPS was capable of doing much more than this site needed. Object Storage is responsible for storing static files. Hugo is responsible for building them. Cloudflare is responsible for the public edge, TLS, caching, redirects, and the small amount of routing compatibility the bucket needs. GitHub Actions connects the pieces.

Just as importantly, the site itself feels useful to me again. It gives me a place to write about code without limiting everything to code, a place to share open source work and applications, and enough room for the random parts of life that do not fit into a tidy category.

The most valuable part of the migration was not any particular service or tool. It was making each layer honest about what it needed to do—and no more.
