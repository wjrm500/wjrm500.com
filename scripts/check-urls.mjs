#!/usr/bin/env node
/**
 * Fails if a post URL published at a base ref is gone and nothing redirects it.
 *
 * A post's URL is derived from its `date` and folder name (src/lib.ts,
 * `postUrl`), so editing either silently moves a page that search engines and
 * other sites link to. Every URL a published post had at the base must still
 * be built, or appear in docker/nginx.conf. Bare node, no dependencies.
 *
 *   node scripts/check-urls.mjs [--base origin/main]
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'origin/main';
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

try {
  git('rev-parse', '--verify', '--quiet', `${base}^{commit}`);
} catch {
  console.log(`check-urls: no ${base} to compare against, skipped.`);
  process.exit(0);
}

// Mirrors postUrl in src/lib.ts. Front matter is read with two regexes rather
// than a YAML parser so this runs without `npm ci`.
function urlFor(folder, text) {
  const fm = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  if (/^draft:\s*true\s*$/m.test(fm)) return null;
  const raw = fm.match(/^date:\s*['"]?([^'"\n]+)['"]?\s*$/m)?.[1];
  const d = raw && new Date(raw);
  if (!d || isNaN(d)) throw new Error(`${folder}: no readable date in front matter`);
  const pad = (n) => String(n).padStart(2, '0');
  return `/${d.getUTCFullYear()}/${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}/${folder}`;
}

function urls(read, files) {
  const out = new Set();
  for (const f of files) {
    const folder = f.match(/^src\/content\/posts\/([^/]+)\/index\.md$/)?.[1];
    if (!folder) continue;
    const text = read(f);
    const url = text && urlFor(folder, text);
    if (url) out.add(url);
  }
  return out;
}

const listAt = (ref) => git('ls-tree', '-r', '--name-only', ref, 'src/content/posts').split('\n');
const before = urls((f) => git('show', `${base}:${f}`), listAt(base));
const headFiles = git('ls-files', 'src/content/posts').split('\n');
const after = urls((f) => { try { return readFileSync(f, 'utf8'); } catch { return null; } }, headFiles);
const nginx = readFileSync('docker/nginx.conf', 'utf8');

const lost = [...before].filter((u) => !after.has(u) && !nginx.includes(u));
if (lost.length) {
  console.error('These published URLs are no longer built and docker/nginx.conf does not redirect them:');
  for (const u of lost) console.error(`  ${u}`);
  console.error('Add a redirect, for example: location = /old/url { return 301 /new/url; }');
  process.exit(1);
}
console.log(`check-urls: all ${before.size} post URLs published at ${base} still resolve.`);
