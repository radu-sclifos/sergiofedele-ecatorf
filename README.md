# Sergio Fedele · Ecatorf

An Italian-language personal website for Sergio Fedele, musician and inventor of the Ecatorf. This repository contains the Astro rebuild of his original Angular site. The homepage introduces Sergio and the instrument.

## Local development

Requires Node.js 22.23.4 or later.

```sh
npm ci
npm run dev
```

Open http://localhost:4321 to view the site.

| Command | Description |
| --- | --- |
| `npm run build` | Build the static site into `dist/`. |
| `npm run preview` | Serve the production build locally after building. |

## Project structure

- `src/pages/` contains the site routes, including the homepage.
- `src/components/` and `src/layouts/` contain shared components and page layouts.
- `src/styles/` contains global styles.
- `src/assets/` contains images processed by Astro, and `public/` contains files served as-is.

## Browser compatibility

Use a single conservative implementation, with Chromium 79 as the build baseline
for older Chromium-based Opera. This is a development target, not a claim that
every older Opera version or every browser has been tested. Internet Explorer and
Opera's pre-Chromium engine are outside this target.

- Use `vh`/`vw`, physical spacing (`margin-left`, `padding-right`), `rgba()`,
  traditional `min-width`/`max-width` media queries and `transform`.
- Use media queries to bound fluid sizes instead of `clamp()`, `min()` or `max()`.
- Use percentage-padding image frames instead of `aspect-ratio`.
- Grid and Flexbox are available. Use `grid-gap`/`grid-column-gap` for Grid and
  margins for Flexbox spacing, avoiding Flexbox `gap`.
- Use explicit classes for state changes instead of `:has()`. Keep keyboard focus
  visible with `:focus`. Do not rely on native `details[name]` group exclusivity.
- Keep newer browser APIs out of essential behavior unless a supported alternative
  is provided. Build targets transform syntax; they do not polyfill browser APIs.
- Keep the compatibility build target: production minification must not introduce
  syntax outside this baseline.

After CSS changes, run `npm run build` and `npm run check:compatibility`, then
inspect `npm run preview` on desktop and narrow screens. The compatibility check
guards the known CSS restrictions in source and generated output; it does not
replace testing with the intended browser. Current-browser emulation changes
screen dimensions, not the rendering engine's age.

## License

The site code is available under the [MIT License](LICENSE). Editorial content, photographs, artwork, and audio and video materials are excluded from the MIT license. All rights in those materials remain with their respective rights holders unless otherwise indicated.
