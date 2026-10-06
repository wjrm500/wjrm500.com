#!/usr/bin/env node
/**
 * Fails on an em dash in posts, pages, site code or docs. The blog's own
 * writing never used one, and an assistant's edits reach for them by habit, so
 * one appearing is a sign a sentence was written in someone else's voice.
 * Use a comma, a colon, brackets or a new sentence instead.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const TEXT = /\.(md|astro|ts|mjs|js|css|ya?ml|sh|conf|json)$/;
const files = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .split('\n')
  .filter((f) => TEXT.test(f) && f !== 'package-lock.json' && f !== 'scripts/lint-em-dashes.mjs');

let found = 0;
for (const f of files) {
  let text;
  try { text = readFileSync(f, 'utf8'); } catch { continue; }
  text.split('\n').forEach((line, i) => {
    if (line.includes('—')) {
      console.error(`${f}:${i + 1}: ${line.trim()}`);
      found++;
    }
  });
}
if (found) {
  console.error(`${found} em dash${found === 1 ? '' : 'es'} found.`);
  process.exit(1);
}
console.log('lint-em-dashes: none found.');
