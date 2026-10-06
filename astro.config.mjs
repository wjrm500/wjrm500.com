// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeFigure from './src/plugins/rehype-figure.mjs';

export default defineConfig({
  site: 'https://wjrm500.com',
  // WordPress served posts at /2025/12/20/slug with no trailing slash; keep those URLs.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  image: {
    // Images get a srcset so phones don't download the 1920px originals.
    layout: 'constrained',
    breakpoints: [640, 960, 1280, 1600],
    // Some old animated GIFs exceed sharp's default pixel limit (it counts every frame).
    service: { entrypoint: 'astro/assets/services/sharp', config: { limitInputPixels: false } },
  },
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypeFigure],
    }),
  },
});
