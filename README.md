# wjrm500.com

My blog, *Will May Learns How to Develop Software*. It's a static site built with [Astro](https://astro.build). Every post, page and image is a file in this repository, so there's no database and no admin panel.

It replaced the WordPress install in October 2026. All 31 posts, the pages, the images and the two comments were carried over, and every old URL still works.

## Writing a post

Make a folder under `src/content/posts/` and put an `index.md` in it. The folder name becomes the URL slug.

```
src/content/posts/my-new-post/
├── index.md
├── cover.png        # optional banner, shown on the post and in lists
└── screenshot.png   # any images the post uses
```

```markdown
---
title: My New Post
date: 2026-10-07T09:00:00Z
description: One or two sentences for the article list, search engines and link previews.
categories:
  - Python
cover: ./cover.png
draft: true          # remove (or set false) to publish
---

Some text, a [link](https://example.com) and `inline code`.

![Alt text for the screenshot](./screenshot.png)
_An italic line straight after an image becomes its caption._

$$
\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$
```

The post will appear at `/YYYY/MM/DD/my-new-post`, using the UTC date. Images are resized and converted to WebP at build time, so drop originals in and don't worry about their size. Code blocks are syntax-highlighted, `$...$` and `$$...$$` render as maths (KaTeX), and raw HTML works for anything Markdown can't do. A YouTube embed, for example:

```html
<div class="video"><iframe src="https://www.youtube.com/embed/VIDEO_ID" title="…" allowfullscreen></iframe></div>
```

Drafts show up in `npm run dev` but are left out of the built site.

Pages that aren't posts (Apps, Links, Developer story, Catan, and the home page intro) live in `src/content/pages/<slug>/index.md` and are served at `/<slug>`.

## Running it

```bash
npm install
npm run dev       # http://localhost:4321, live reload
npm run build     # static site in dist/
npm run check     # type-check
```

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`. It type-checks, builds the Docker image (`Dockerfile`: Astro build, then nginx serving `dist/`), pushes it to Docker Hub as `wjrm500/wjrm500-com:latest`, and SSHes to the droplet to pull and restart it. The compose file and the host nginx (TLS, port 5000) live in the [ServerConfig](https://github.com/wjrm500/ServerConfig) repository.

The workflow needs these repository secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `DROPLET_HOST`, `DROPLET_USER`, `DROPLET_SSH_KEY`. They're the same values the other apps use.

## Old WordPress URLs

`docker/nginx.conf` keeps the old links working:

| Old | New |
| --- | --- |
| `/2025/12/20/slug/` (trailing slash) | `/2025/12/20/slug` |
| `/feed`, `/comments/feed` | `/feed.xml` |
| `/category/articles`, `/page/N`, `/2025/12`, `/author/…` | `/articles` |
| `/category/python` etc. | unchanged |
| `/wp-content/uploads/…` downloads (Catan, Pawnfork, the dissertation PDF, the podcast clip) | unchanged, served from `public/` |
| `/wp-admin`, `/wp-login.php`, `/xmlrpc.php`, `/wp-json` | 410 Gone |

## Comments

WordPress comments are gone. The two that existed are kept as static text in their posts' front matter (`comments:`). Each post ends with an invitation to email me instead.
