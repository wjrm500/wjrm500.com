import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/posts', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      description: z.string().optional(),
      categories: z.array(z.string()).default([]),
      cover: image().optional(),
      draft: z.boolean().default(false),
      // Comments carried over from WordPress. New ones are not collected.
      comments: z
        .array(z.object({ author: z.string(), date: z.coerce.date(), text: z.string() }))
        .default([]),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/pages', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({ title: z.string() }),
});

export const collections = { posts, pages };
