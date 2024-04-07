import react from "@astrojs/react";
import { defineConfig } from 'astro/config';
import rehypeMathJax from 'rehype-mathjax';
import remarkMath from 'remark-math';
import { loadEnv } from "vite";
loadEnv(process.env.NODE_ENV, process.cwd(), "");
import vercel from '@astrojs/vercel/serverless';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathJax]
  },
  server: {
    port: 3000
  },
  site: "https://hoang-pham.netlify.app/",
  integrations: [react()],
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    }
  },
  output: 'server',
  adapter: netlify()
});