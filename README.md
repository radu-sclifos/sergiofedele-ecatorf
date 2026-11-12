# Sergio Fedele · Ecatorf

The personal website of Sergio Fedele, musician and inventor of the Ecatorf.
This repository contains the static Astro rebuild of his original Angular site,
preserving its editorial content and visual style.

## Getting started

Requires Node.js 22.23.4 or later.

```sh
npm ci
npm run dev
```

Open [localhost:4321](http://localhost:4321) to view the site.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Generate the static site in `dist/`. |
| `npm run preview` | Serve the production build locally after building. |
| `npm run check:compatibility` | Check source and production CSS against the project's compatibility policy. |
| `node --test scripts/browser-check.test.mjs` | Test browser identification in the diagnostics page. |

## Pages and routing

Astro generates routes from files in `src/pages/`. Navigation uses ordinary HTML
links that load a complete page; there is no client-side router.

| Source | Route | Content |
| --- | --- | --- |
| `src/pages/index.astro` | `/` | Introduction to Sergio and the instrument. |
| `src/pages/biografia.astro` | `/biografia/` | Music, visual arts, literature and photo galleries. |
| `src/pages/ecatorf.astro` | `/ecatorf/` | Technical descriptions, photographs, range illustrations and video. |

## Project structure

| Directory | Purpose |
| --- | --- |
| `src/pages/` | Pages and routes. |
| `src/components/` | Shared components, including navigation, footer and galleries. |
| `src/layouts/` | Shared HTML page structure. |
| `src/styles/` | Global styles and shared text typography (`body-copy`). |
| `src/assets/` | Images processed by Astro, grouped by page. |
| `public/` | Files served unchanged, including browser diagnostics and license notices. |
| `scripts/` | Compatibility checks and browser identification tests. |

Photo galleries use [PhotoSwipe](https://photoswipe.com/) through
`src/components/Gallery.astro`. Each instance is independent, with responsive
thumbnails, zoom, arrow and touch navigation, and keyboard controls. The main
PhotoSwipe module loads when a gallery opens; image links also work without
JavaScript.

## Browser support and diagnostics

Chromium 79 is the current compatibility target for older Chromium-based browsers.
This is a development baseline, not a certification that every supported browser
has been tested. Internet Explorer and Opera's pre-Chromium engine are outside
the target.

## License

The site code is available under the [MIT License](LICENSE). Editorial content,
photographs, artwork, and audio and video materials are excluded from the MIT
license. All rights in those materials remain with their respective rights
holders unless otherwise indicated.

PhotoSwipe is distributed under the MIT license, copyright 2014–2022 Dmitry
Semenov. Its complete notice is included in
[`public/licenses/photoswipe.txt`](public/licenses/photoswipe.txt), published at
`/licenses/photoswipe.txt`. See the
[upstream license](https://github.com/dimsemenov/PhotoSwipe/blob/master/LICENSE).

Montserrat is self-hosted as WOFF2 files in `src/assets/fonts/`, with local
`@font-face` rules in `src/styles/global.css`; no Google Fonts requests are needed.
The Latin subset serves both regular and bold text; the Latin Extended subset
loads only when its characters are needed. Vite fingerprints the font URLs for
cache invalidation when the files change. Montserrat is distributed under the
SIL Open Font License 1.1, included in
[`public/licenses/montserrat.txt`](public/licenses/montserrat.txt).
