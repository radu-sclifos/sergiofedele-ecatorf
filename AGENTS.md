# Development instructions

These instructions apply to the entire repository. See [README.md](README.md)
for project setup, commands, routes and current migration status.

## Scope and visual style

- This is a faithful Astro port of the original Angular site. Preserve Sergio's
  editorial content, typography, colors and overall composition. Keep visual
  improvements modest; do not introduce a redesign without a user request.
- Reuse shared components and `BaseLayout.astro` for page structure.
- Use the global `page-title` class for primary page headings; keep their size
  and line height centralized instead of overriding them per page.
- Use the global `body-copy` class on editorial text containers. It defines
  15 px text (in rem), a 1.65 line height and paragraph spacing. Keep alignment
  and page-specific layout rules local; avoid overriding the shared typography.
  Do not apply this class to navigation, buttons or the entire HTML body.
- Progettazione uses `DesignCarousel.astro` with PhotoSwipe for the fullscreen
  viewer. Preserve all 26 pages in `src/data/ecatorf-design.ts`, including
  repeated and blank pages, in their original 13 pairs. Always show two pages
  together: arrows advance 1–2 → 3–4, including in fullscreen. Keep the pair
  selected on closing the viewer. Fit the preview to viewport width and height,
  with clearly visible arrows and no extra image links or page index.
  Preserve PhotoSwipe's thumbnail zoom transition and translucent backdrop;
  leave the space between fullscreen pages transparent, without a connecting
  background strip.

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

- For routine changes, run only `npm run build` to verify compilation.
- The user handles visual verification. Do not open or automate browsers,
  start preview servers, capture screenshots, or run additional checks unless
  the user explicitly requests them.
- The compatibility check covers known CSS restrictions in source and generated
  output. It does not replace testing with the intended browser. Current-browser
  viewport emulation changes dimensions, not the age of the rendering engine.
- Browser identification tests are available through
  `node --test scripts/browser-check.test.mjs` when explicitly requested.
- Report verification limits accurately, especially when Chromium 79 itself has
  not been used for testing.
