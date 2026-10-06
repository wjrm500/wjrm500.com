---
name: new-post
description: Start a new blog post on wjrm500.com - the folder, front matter, images and a draft flag - from a title, notes or a pasted draft. Use when the maintainer wants to write, import or set up a post.
---

# New post

README.md, "Writing a post", is the reference for the format; trust it over anything here.

## The routine

1. **Pick the folder name.** It is the URL slug for good, so lower-case, hyphenated and short
   enough to read aloud. Check `src/content/posts/` for a clash.
2. **Write `index.md`** with `title`, `date` (UTC, ISO, quoted like the existing posts), a one or
   two sentence `description`, `categories` reused from existing posts where one fits (list them
   with `grep -h -A4 '^categories:' src/content/posts/*/index.md`), and `draft: true`.
3. **Body.** If the maintainer gave you prose, use it as written: fix only typos and broken
   Markdown, and say what you changed. If they gave notes, write a skeleton of headings and their
   notes under each, not finished prose; the words are theirs to write unless they ask you to.
4. **Images** go in the post's folder and are referenced as `./name.png`. A caption is an
   `_italic_` line straight after the image, in the same paragraph. Every image gets alt text.
5. **Check it** with `npm run check:merge`, then tell the maintainer the URL it will have
   (`/YYYY/MM/DD/<folder>`) and that it is a draft until they remove `draft: true`.

Never remove `draft: true` yourself unless the maintainer says to publish: a push to `main` is
live on the site.
