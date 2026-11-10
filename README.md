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

## License

The site code is available under the [MIT License](LICENSE). Editorial content, photographs, artwork, and audio and video materials are excluded from the MIT license. All rights in those materials remain with their respective rights holders unless otherwise indicated.
