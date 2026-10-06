import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE_TITLE = 'Will May Learns How to Develop Software';
export const SITE_DESCRIPTION = 'A collection of long, rambling posts about my software projects';

export type Post = CollectionEntry<'posts'>;

/** Published posts, newest first. Drafts show up in `astro dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', (p) => import.meta.env.DEV || !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** The WordPress permalink shape: /2025/12/20/slug */
export function postUrl(post: Post): string {
  const d = post.data.date;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `/${d.getUTCFullYear()}/${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}/${post.id}`;
}

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Minutes to read at about 230 words a minute, ignoring Markdown image and link targets. */
export function readingTime(post: Post): number {
  const words = (post.body ?? '').replace(/\]\([^)]*\)/g, ']').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
