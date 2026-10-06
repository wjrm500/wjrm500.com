# wjrm500.com - agent guide

The entry point for every AI assistant working here, whichever model or product; `CLAUDE.md` is a
symlink to this file. README.md is how the blog works; this file holds the working rules. Settled
questions that still look open are in DECISIONS.md: read it before proposing to change how
something works.

## How to talk to the maintainer

Chat replies only (commit messages and PR bodies stay full):

1. Only say what the maintainer needs to decide or do next. Leave out what you looked at,
   considered or fixed along the way.
2. Use everyday words and short sentences.
3. Report the result, not how you did the work. No preamble, no recap, no hedging. Ask one
   question at a time.

The maintainer has ADHD. A dense reply gets abandoned, not skimmed. Technical depth is welcome
when it was asked for.

## The site

Static Astro blog. Content is Markdown in `src/content/` (README.md, "Writing a post"); the site
code is `src/pages`, `src/layouts`, `src/components`, `src/lib.ts` and `src/styles/global.css`.

- Post URLs are `/YYYY/MM/DD/<folder name>` from the `date` front matter (UTC). Changing a
  published post's date or folder name moves its URL: add a redirect in `docker/nginx.conf`.
  `npm run check:urls` fails if you don't.
- Images live next to the post that uses them and are referenced relatively (`./image.png`) so
  Astro optimises them. Only non-image downloads go in `public/`.
- An image line followed by an `_italic_` line in the same paragraph becomes a figure with a
  caption (`src/plugins/rehype-figure.mjs`).
- `docker/nginx.conf` is the container's nginx; TLS and the domain are handled by the host nginx
  in the ServerConfig repository.

## The words are the author's

- A new post starts with `draft: true`. Publishing (removing it) is the maintainer's call, because
  a push to `main` is live.
- Do not write or rewrite prose unless asked. When asked to tidy, fix typos and broken Markdown
  and say what changed. The `editor` Skill gives feedback without editing.
- A published post is a record. Correct a wrong fact, a dead link or a broken image; leave its
  voice and argument as they shipped. A substantive change sets `updated:`.
- House style: British English, curly quotes and apostrophes, a spaced en dash ( – ), never an
  em dash anywhere (`npm run lint:em-dashes`).
- The two WordPress comments in front matter are kept as they were written.

## Checks

`npm run check:merge` runs everything: the em-dash lint, the URL check, `astro check` and the
build. It takes a minute or two, so run it before every push without being asked, and say in one
line that it passed. `npm run dev` serves drafts at http://localhost:4321.

## Comments in code

A comment says what the code cannot: why a value is what it is, a non-obvious constraint, an
external gotcha (WordPress URLs, nginx, sharp). One to four lines, plain prose. No history, no
restating the code.

## Out-of-scope problems

Notice something broken while working on something else? Fix it in its own commit if the fix is
obvious and small. Otherwise mention it in one line at the end of your reply, or file an issue if
the maintainer asks you to.

## Skills

In `.claude/skills/`: `new-post` (set up a post), `editor` (feedback on a post, no edits),
`site-review` (design and code review of the site). Each ends in a report: that report is the
reply when the maintainer asked for it.

## Git and deploying

- Work on the branch you were given. One logical change per commit. Merge commits, never squash.
- A push to `main` deploys to production (`.github/workflows/deploy.yml`: `astro check`, then the
  Docker image, then the droplet). Nothing else runs on Actions. The repository is public, so
  Actions minutes are free here, but keep it that way: checks run in the container.
- Do not merge to `main` or publish a draft without being told to. When told, merge `main` into
  the branch first and run `npm run check:merge` on the result.
