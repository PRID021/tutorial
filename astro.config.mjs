import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000
  },
  site: "https://hoang-pham.netlify.app/",
  integrations: [react()]
});