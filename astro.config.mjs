// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    vite: {
        build: {
            // Conservative Chromium baseline; source CSS follows README.md.
            target: 'chrome79',
            cssTarget: 'chrome79',
        },
    },
});
