import { defineConfig } from 'astro/config';
import qwikdev from "@qwikdev/astro";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      preserveSymlinks: true
    }
  },
  integrations: [qwikdev(), tailwind()]
});