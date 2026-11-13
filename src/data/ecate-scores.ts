import type { ImageMetadata } from 'astro';

const images = import.meta.glob<ImageMetadata>('../assets/partiture-ecate/carosello/*.webp', {
    eager: true,
    import: 'default',
});

// Original Angular sequence: both sides of each screen, then a blank page.
// Keep all eleven blank pages, including the final one, as requested by Sergio.
const screens = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', '1', '2', '3'];

export const ecatePages = screens.flatMap(screen => [
    {file: `${screen}a.webp`, alt: `Partiture per Ecate, paravento ${screen}, lato A — Sergio Fedele`},
    {file: `${screen}b.webp`, alt: `Partiture per Ecate, paravento ${screen}, lato B — Sergio Fedele`},
    {file: 'vuoto.webp', alt: 'Pagina bianca di separazione'},
]).map(({file, alt}) => ({
    src: images[`../assets/partiture-ecate/carosello/${file}`],
    alt,
}));
