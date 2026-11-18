// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.sergiofedele-ecatorf.it',
    trailingSlash: 'always',
    integrations: [sitemap()],
    vite: {
        plugins: [{
            name: 'compatible-vendor-styles',
            transform(code, id) {
                const file = id.replaceAll('\\', '/');
                if (file.endsWith('/photoswipe/dist/photoswipe.css')) {
                    // Keep vendor spacing consistent with the project's physical spacing rules.
                    return code.replaceAll('margin-inline-start:', 'margin-left:');
                }
            },
        }],
        build: {
            // Conservative Chromium baseline
            target: 'chrome101',
            cssTarget: 'chrome101',
        },
    },
});
