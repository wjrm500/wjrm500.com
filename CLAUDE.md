# wjrm500.com

Static Astro blog. Content is Markdown in `src/content/` (see README.md, "Writing a post"); the site code is in `src/pages`, `src/layouts`, `src/components` and `src/styles/global.css`.

- Post URLs are `/YYYY/MM/DD/<folder name>` derived from the `date` front matter (UTC). Changing a published post's date or folder name changes its URL: add a redirect in `docker/nginx.conf` if you do.
- Images live next to the post that uses them and are referenced relatively (`./image.png`) so Astro optimises them. Only non-image downloads go in `public/`.
- An image line followed by an `_italic_` line in the same paragraph becomes a figure with a caption (`src/plugins/rehype-figure.mjs`).
- Before pushing, run `npm run check` and `npm run build`. A push to `main` deploys to production.
- `docker/nginx.conf` is the container's nginx; TLS and the domain are handled by the host nginx in the ServerConfig repository.
