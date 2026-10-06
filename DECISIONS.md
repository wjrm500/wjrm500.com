# Settled decisions

Things that might look like problems or missing features, have been decided, and are staying as
they are. Check here before proposing to change one, and bring the fact that changed, not the
observation that started it. If a decision can be enforced by a check, it belongs in a check
instead (see `scripts/`); this file is for the ones that can't.

## No comments system

WordPress comments were dropped in the migration. The two that existed are kept as static text in
their posts' front matter, and each post invites readers to email instead. A comments service
would mean a database, a third-party script or moderation work, for a blog that got two comments
in four years.

## No trailing slashes, and old WordPress URLs keep working

Posts are served at `/YYYY/MM/DD/slug` with no trailing slash (`trailingSlash: 'never'` in
`astro.config.mjs`), the shape WordPress used. `docker/nginx.conf` redirects the slashed form,
the old feed, category, archive and author URLs, and answers WordPress admin probes with 410. The
redirects are permanent; links to the blog from elsewhere depend on them.

## A static site, not a CMS

Every post, page and image is a file in the repository, so changes are versioned and can be made
by an assistant with ordinary edits. There is no admin panel, database or client-side framework,
and adding one needs a reason a file in git can't meet.

## Images next to the post, not in `public/`

So Astro resizes them and converts them to WebP at build time, and a post's folder holds
everything it needs. `public/` is only for files that must keep their exact old URL
(`/wp-content/uploads/...` downloads).
