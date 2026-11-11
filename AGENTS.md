# Development instructions

These instructions apply to the entire repository. See [README.md](README.md)
for project setup, commands, routes and current migration status.

## Scope and visual style

- This is a faithful Astro port of the original Angular site. Preserve Sergio's
  editorial content, typography, colors and overall composition. Keep visual
  improvements modest; do not introduce a redesign without a user request.
- Reuse shared components and `BaseLayout.astro` for page structure.
- Use the global `body-copy` class on editorial text containers. It defines
  15 px text (in rem), a 1.65 line height and paragraph spacing. Keep alignment
  and page-specific layout rules local; avoid overriding the shared typography.
  Do not apply this class to navigation, buttons or the entire HTML body.
- Leave Ecatorf's Progettazione section as a placeholder until the user supplies
  the intended library and requests its implementation.

## Browser compatibility

Keep a single conservative implementation targeting Chromium 79. Preserve
`target: 'chrome79'` and `cssTarget: 'chrome79'` in `astro.config.mjs`, including
through production minification.

- Use `vh`/`vw`, physical spacing (`margin-left`, `padding-right`), `rgba()`,
  traditional `min-width`/`max-width` media queries and `transform`.
- Bound fluid sizes with media queries instead of `clamp()`, `min()` or `max()`.
- Use percentage-padding image frames instead of `aspect-ratio`.
- Grid and Flexbox are available. Use `grid-gap`/`grid-column-gap` for Grid and
  margins for Flexbox spacing; avoid Flexbox `gap`.
- Use explicit classes for state changes instead of `:has()`. Keep keyboard focus
  visible with `:focus`. Do not rely on native `details[name]` group exclusivity.
- Keep newer browser APIs out of essential behavior unless a supported
  alternative is provided. Build targets transform syntax; they do not polyfill
  browser APIs.
- Preserve the Vite transform that converts PhotoSwipe's `margin-inline-start`
  declaration to `margin-left`.

## Images and galleries

- Original-site images may be copied into `src/assets/` and renamed descriptively.
  Keep them grouped by page and use Astro image processing where appropriate.
- Reuse `src/components/Gallery.astro` for photo galleries. Pass an array of
  objects with an imported Astro image as `src` and descriptive alternative text
  as `alt`:

  ```astro
  ---
  import Gallery from '../components/Gallery.astro';
  import photo from '../assets/biografia/kwatz1.webp';

  const photos = [{ src: photo, alt: 'Preparazione di Kwatz!' }];
  ---

  <Gallery photos={photos} />
  ```

- Each instance is a separate gallery; preserve its navigation boundaries,
  responsive thumbnails, on-demand loading and image links without JavaScript.
- Preserve `public/licenses/photoswipe.txt` when distributing the site. The MIT
  license for site code does not cover editorial content or media.

## Browser diagnostics

- Keep the standalone diagnostics page and script in `public/`, copied unchanged
  by Astro. Preserve the classic ES5 script for older browsers.
- Apply experimental CSS only inside temporary probes at runtime, so build
  transpilation and fallback CSS cannot make an unsupported test pass.
- Flexbox gap, aspect ratio, viewport heights, clamp and translate checks use
  layout measurements; the other checks detect syntax or API availability.
- Keep results local. Do not infer an exact Chromium version from feature
  support or distinguish Windows 10 and 11 from their shared User-Agent token.

## Validation

- After CSS changes, run `npm run build` followed by
  `npm run check:compatibility`, then inspect the production preview on desktop
  and narrow screens.
- The compatibility check covers known CSS restrictions in source and generated
  output. It does not replace testing with the intended browser. Current-browser
  viewport emulation changes dimensions, not the age of the rendering engine.
- After browser identification changes, run
  `node --test scripts/browser-check.test.mjs`.
- Report verification limits accurately, especially when Chromium 79 itself has
  not been used for testing.
