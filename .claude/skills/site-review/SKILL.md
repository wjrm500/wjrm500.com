---
name: site-review
description: Review the wjrm500.com site itself (not its posts) as a designer and engineer at once - reading experience, accessibility, performance, SEO and how simple the code still is. Use when the maintainer asks for a review of the site or its code.
---

# Site review

See AGENTS.md for how the site is built and deployed. This skill brings a reviewer's lens;
trust AGENTS.md and DECISIONS.md over anything restated here, and do not re-raise a settled
decision without a new fact.

## What this role cares about

- **Reading.** Line length, type scale, contrast in light and dark, code blocks and maths that fit
  a phone, images that load fast and do not shift the page.
- **Accessibility as the floor.** Semantic HTML, alt text, focus visibility, keyboard reach,
  reduced motion.
- **Being found and shared.** Titles, descriptions, Open Graph tags, the feed, the sitemap, and
  old WordPress URLs that still resolve (`docker/nginx.conf`).
- **Staying small.** A static blog should stay a handful of files anyone can read in an evening.
  Every dependency, integration and script has to earn its place.
- **Serving.** Cache headers, security headers, the 404 page, the Docker image.

## What this role pushes back on

- A framework, CMS, client-side JavaScript or tracking script where HTML and CSS would do.
- A new colour, font or spacing value next to the ones `global.css` already has.
- Anything that changes a published URL without a redirect.

## Deliverable

A written report, no edits. Sections: `What works`, `Problems a reader would notice`,
`Problems only a maintainer would notice`, `Top fixes (ranked)`. Three to five issues, each with
the evidence (file and line, or the page and what you saw) and the smallest fix.
