// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [{
            name: 'photoswipe-compatible-spacing',
            transform(code, id) {
                if (id.replaceAll('\\', '/').endsWith('/photoswipe/dist/photoswipe.css')) {
                    // Keep vendor spacing within the project's Chromium 79 CSS baseline
                    return code.replaceAll('margin-inline-start:', 'margin-left:');
                }
            },
        }],
        build: {
            // Conservative Chromium baseline
            target: 'chrome79',
            cssTarget: 'chrome79',
        },
    },
});
