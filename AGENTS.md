# Development instructions

These instructions apply to the entire repository. See [README.md](README.md)
for the project overview, architecture, setup and commands.

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
- Partiture per Ecate uses the same carousel with `pagesPerSlide={1}`. Preserve
  all 33 entries in `src/data/ecate-scores.ts`, including the 11 blank pages,
  in their original order.

## SEO and public URLs

- This rebuild replaces the Angular site at the existing domain. Keep `site`
  set to `https://www.sergiofedele-ecatorf.it` and `trailingSlash: 'always'`
  in `astro.config.mjs`. The separate historical site at `sergiofedele.it`
  remains active by the owner's choice; its links are intentional.
- Keep titles, descriptions, canonical links and sharing metadata centralized
  in `BaseLayout.astro`. Use distinct, descriptive page titles and imported local
  images through `socialImage` and `socialImageAlt`. Canonical and image URLs
  must use the production origin, without preview hostnames or tracking queries.
- `StructuredData.astro` is enabled through the layout's `structuredData` prop:
  `home` provides `WebSite` and `Person`; `biography` provides `ProfilePage` and
  the same `Person`. Preserve stable `@id` values, verified `sameAs` links and
  safe JSON serialization. Describe only supported facts; avoid adding schema
  types to unrelated pages or promising ranking gains.
- Keep sitemap generation in `@astrojs/sitemap`; do not maintain generated XML
  by hand or edit `dist/`. Preserve the sitemap index reference in
  `public/robots.txt` and the shared layout. The production robots policy allows
  crawling; do not add a blanket `noindex` to the shared layout.
- Preserve legacy URL mappings in `public/_redirects`, including `/sitemap.xml`.
  These redirects are host-specific and do not run in the local Astro server.

## Privacy and external services

- Keep fonts and images self-hosted. Preserve the Montserrat license notice
  in `public/licenses/montserrat.txt`.
- YouTube iframes must only be created after consent and removed on revocation.
  Preserve the local placeholder, external link and behavior without JavaScript.
- Keep accept/refuse actions equally visible and preferences accessible after
  either choice. Missing, invalid or expired preferences must block YouTube;
  unavailable storage must not imply consent. Preserve six-month expiry and
  synchronization across tabs and restored pages.
- If optional services or processing conditions materially change, update the
  privacy/cookie notices and increment the consent version in `CookieConsent.astro`.
  Do not infer hosting settings or legal compliance from source code alone.

## Documentation

- Keep `README.md` in English and focused on the public project: purpose,
  architecture, features, local development, deployment and licensing.
- Keep agent instructions, implementation rules and internal reminders in
  `AGENTS.md`, rather than turning the README into an agent runbook.

## Browser compatibility

Keep a single conservative implementation targeting Chromium 101. Preserve
`target: 'chrome101'` and `cssTarget: 'chrome101'` in `astro.config.mjs`, including
through production minification.

- Use `vh`/`vw`, physical spacing (`margin-left`, `padding-right`), `rgba()`,
  traditional `min-width`/`max-width` media queries and `transform`.
- Use `clamp()` or media queries to bound fluid sizes. Avoid `min()` and `max()`.
- `aspect-ratio` is available for image frames.
- `gap` is available in Grid and Flexbox.
- Avoid `svh` and `dvh` viewport units, range media queries and individual
  transform properties such as `translate`.
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
- Report verification limits accurately, especially when Chromium 101 itself has
  not been used for testing.
