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
| `src/pages/partitureperecate.astro` | `/partitureperecate/` | Modular screens, dimensions and the original sequence of 33 pages, including 11 blank pages. |
| `src/pages/composizioni.astro` | `/composizioni/` | Solo, Trio and PsicoGeografico compositions, scores, CD covers, reviews and translations. |
| `src/pages/privacy.astro` | `/privacy/` | Privacy notice draft, including hosting and contact information. |
| `src/pages/cookie.astro` | `/cookie/` | Local preference storage and optional YouTube service. |

## Privacy and YouTube consent

`CookieConsent.astro` is shared by all pages. Its non-modal panel offers equally
visible accept/refuse actions; closing the initial panel saves a refusal.
The small Cookie button and footer controls reopen preferences after either choice.
`YouTubeVideo.astro` keeps a local, text-only placeholder visible until consent;
the iframe is created only after acceptance and removed on revocation. With
JavaScript disabled, only an ordinary external YouTube link is available.

The `ecatorf-cookie-consent` localStorage entry records a boolean YouTube choice,
consent version, timestamp and expiry six calendar months later. It is local to
the browser and origin, with no consent logging endpoint or tracking identifier.
Expiry, invalid records and missing storage default to blocking YouTube. If storage
is unavailable, an explicit choice can enable it only in the current page.
Open tabs synchronize storage changes; restored/foregrounded pages recheck the choice.
Privacy and cookie pages do not automatically open the panel, so the notices can
be read without dismissing it. Preferences remain available there.

Before publishing, the site owner must confirm the controller/contact details and
complete the privacy draft's retention periods, hosting/processing arrangements,
email provider details and international-transfer safeguards. Verify the actual
Netlify account settings (including analytics, integrations and injected scripts)
and inventory the player's cookies/storage in the intended deployment. The source
audit alone cannot establish these facts. No blanket GDPR-compliance claim is made.
If optional services or processing conditions change materially, update both notices
and increment the consent version in `CookieConsent.astro` to request a new choice.
The client-side record is not a server-side consent audit trail; the owner must
assess documentation requirements before launch.

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

`src/components/ActionIcon.astro` centralizes decorative SVG action icons and
uses the global `action-icon` styles. Select an icon with `name`; optional `size`
and `strokeWidth` preserve context-specific dimensions. Use `standalone` for
icons without adjacent text; the containing control supplies its accessible name.

Photo galleries use [PhotoSwipe](https://photoswipe.com/) through
`src/components/Gallery.astro`. Each instance is independent, with responsive
thumbnails, zoom, arrow and touch navigation, and keyboard controls. The main
PhotoSwipe module loads when a gallery opens; image links also work without
JavaScript.

`DesignCarousel.astro` shares preview and fullscreen navigation for Ecatorf's
paired design pages and the single pages of Partiture per Ecate (`pagesPerSlide={1}`).
Both keep the current selection when closing PhotoSwipe. Ecate's original sequence
is stored in `src/data/ecate-scores.ts`, including each blank separator and the final
blank page.

CD covers on Composizioni use `src/components/composizioni/CoverImage.astro`:
each cover opens its own single-image PhotoSwipe viewer, with thumbnail zoom,
a translucent backdrop and closing on a backdrop click, without navigation to
other covers. The image link remains available without JavaScript.

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

