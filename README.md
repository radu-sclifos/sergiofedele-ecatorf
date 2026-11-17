# Sergio Fedele · Ecatorf

A personal website documenting the work of Sergio Fedele, musician and inventor
of the Ecatorf: an experimental wind instrument that combines elements of the
clarinet, trombone and other brass instruments.

**Website:** [sergiofedele-ecatorf.it](https://www.sergiofedele-ecatorf.it/)

This repository contains the Astro reconstruction of the existing Angular
website. The project preserves its Italian editorial content, typography, colors
and overall composition while moving to a static, component-based architecture.
It brings together Sergio's biography, instrument research, compositions,
recordings, scores, visual works, writing and documentary film.

## Editorial and visual direction

The site's editorial content and visual direction were chosen by Sergio Fedele,
including fonts, colors, typography and overall composition. This reconstruction
deliberately preserves those choices, including where they depart from common
web design conventions. They reflect Sergio's preferences and artistic direction;
the developer's role is their technical implementation and the migration to
Astro, rather than the expression of the developer's own design preferences.

## From Angular to Astro

The migration focuses on an editorial website with a substantial collection of
photographs, documents and musical material. Astro generates complete HTML pages
at build time, with ordinary links between routes and no client-side router.
JavaScript supports interactions such as galleries, carousels, content selectors
and video preferences.

Shared layouts and components keep navigation, typography and recurring interface
elements consistent across the site. Editorial content lives in Astro pages;
ordered image collections live in TypeScript data modules. The generated site
can be served as static files without an application server or database.

## Built with

| Technology | Role |
| --- | --- |
| [Astro](https://astro.build/) | Static page generation, reusable components and image processing. |
| TypeScript | Interactive behavior and structured gallery data. |
| CSS | Shared typography, responsive layouts and component styles. |
| [PhotoSwipe](https://photoswipe.com/) | Fullscreen image viewing, zoom and gallery navigation. |
| `@astrojs/sitemap` | Sitemap generation from the site's routes during each build. |

## Features and implementation

### Editorial content and media

The site covers Sergio's biography, the Ecatorf's construction and acoustic
characteristics, solo and ensemble recordings, and downloadable scores. Other
sections present *Partiture per Ecate*, *Contar*, the Kwatz! Ensemble, essays and
articles, and the documentary *V’è la via e v’è l’andare*.

Photo galleries have independent navigation, responsive thumbnails and
on-demand loading of the fullscreen viewer. The Ecatorf design carousel presents
26 pages in their original 13 pairs, including repeated and blank pages. The
*Partiture per Ecate* carousel retains its original 33-page sequence. Both preserve
the selected slide when the fullscreen viewer closes.

Images are stored locally and processed through Astro, with responsive sources,
reserved layout space and lazy loading where appropriate. Montserrat is
self-hosted as WOFF2 files.

### Progressive enhancement and accessibility

Core editorial content, navigation, document downloads and gallery image links
remain available without JavaScript. Interactive controls include keyboard
navigation, visible focus styles and accessible labels. Loading animations and
transitions account for reduced-motion preferences.

### Video preferences

YouTube embeds are created only after consent and removed when consent is
revoked. Until then, each video displays a local placeholder with an external
YouTube link. Preferences are stored locally in the browser for six months and
can be changed through the shared cookie controls. The site source includes no
analytics or advertising integration.

### Search and sharing

Every page includes a title, description, canonical URL, Open Graph metadata and
Twitter Card metadata. Sharing images are generated locally as JPEGs. Canonical
URLs use `https://www.sergiofedele-ecatorf.it/`.

The homepage includes `WebSite` and `Person` JSON-LD. The biography uses
`ProfilePage`, linked to the same person identity and established external
profiles. The build generates `sitemap-index.xml` and its URL sitemap;
`robots.txt` points to the index.

## Project structure

```text
src/
  assets/       Local images and fonts
  components/   Navigation, galleries, carousels and other shared UI
  data/         Ordered image collections
  layouts/      Base, project and legal page layouts
  pages/        File-based routes and editorial content
  scripts/      Shared interaction utilities
  styles/       Global typography and shared styles
public/         PDFs, favicons, robots.txt, redirects, diagnostics and licenses
scripts/        Browser compatibility checks and diagnostic tests
```

## Local development

Requires **Node.js 22.23.4 or later** and npm.

```sh
npm ci
npm run dev
```

The development site is available at [localhost:4321](http://localhost:4321).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Generate the static site in `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run check:compatibility` | Check source and production CSS against the compatibility policy. |
| `node --test scripts/browser-check.test.mjs` | Run the browser identification tests. |

## Deployment and browser support

The deployment artifact is `dist/`, produced by `npm run build`.
`public/_redirects` provides Netlify redirects for the previous Angular Contar
and Film routes and the previous sitemap URL. Other hosts require equivalent
redirect configuration; the local Astro server does not apply this file.

JavaScript and CSS build targets are set to **Chromium 79**, with conservative
CSS patterns used throughout the site. A standalone browser diagnostics page is
available at `/verifica-browser.html`. This compatibility target and the
automated checks do not constitute verification in the actual target browser.
Internet Explorer and pre-Chromium Opera are outside the support target.

## Author and licensing

Website development by [Radu Sclifos](https://github.com/radu-sclifos).
Editorial content and artistic work by Sergio Fedele, with individual media
rights belonging to their respective holders.

The site code is available under the [MIT License](LICENSE). Editorial content,
photographs, artwork, scores, audio and video materials are excluded from that
license and remain subject to their respective rights.

Third-party license notices are included for
[PhotoSwipe](public/licenses/photoswipe.txt) (MIT) and
[Montserrat](public/licenses/montserrat.txt) (SIL Open Font License 1.1).
