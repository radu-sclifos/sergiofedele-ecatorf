import type { ImageMetadata } from 'astro';

const images = import.meta.glob<ImageMetadata>('../assets/ecatorf/progettazione/*.webp', {
    eager: true,
    import: 'default'
});

// Preserve every leaf of the original spreads (including blank and repeated pages)
const sequence = [
    {
        "file": "0.webp",
        "alt": "Pagina bianca per spaziatura"
    },
    {
        "file": "1.webp",
        "alt": "Pagina vista dall'alto (con coulisse chiusa e coulisse tutta aperta)"
    },
    {
        "file": "VistaAlto1.webp",
        "alt": "Vista dall'alto con coulisse chiusa"
    },
    {
        "file": "VistaAlto2.webp",
        "alt": "Vista dall'alto con coulisse tutta aperta"
    },
    {
        "file": "0.webp",
        "alt": "Pagina bianca per spaziatura"
    },
    {
        "file": "2.webp",
        "alt": "Pagina profilo sinitro (con e senza sostegno)"
    },
    {
        "file": "ProfiloSinistro1.webp",
        "alt": "Profilo sinistro senza sostegno"
    },
    {
        "file": "ProfiloSinistro2.webp",
        "alt": "Profilo sinistro con sostegno"
    },
    {
        "file": "0.webp",
        "alt": "Pagina bianca per spaziatura"
    },
    {
        "file": "3.webp",
        "alt": "Pagina sinossi delle posizioni"
    },
    {
        "file": "SinossiDellePosizioni1.webp",
        "alt": "Sinossi delle posizioni"
    },
    {
        "file": "3-1.webp",
        "alt": "Tavola dei suoni fondamentali"
    },
    {
        "file": "SinossiDellePosizioni2.webp",
        "alt": "Sinossi delle posizioni"
    },
    {
        "file": "3-2.webp",
        "alt": "Tavola delle dodicesime"
    },
    {
        "file": "SinossiDellePosizioni2.webp",
        "alt": "Sinossi delle posizioni"
    },
    {
        "file": "3-3.webp",
        "alt": "Tavola delle diciassettesime"
    },
    {
        "file": "0.webp",
        "alt": "Pagina bianca per spaziatura"
    },
    {
        "file": "4.webp",
        "alt": "Tavole delle principali posizioni"
    },
    {
        "file": "TavolePrincipaliPosizioni1.webp",
        "alt": "Ecatorf valvola 1 aperta, coulisse chiusa"
    },
    {
        "file": "TavolePrincipaliPosizioni2.webp",
        "alt": "Ecatorf valvola 1 aperta, coulisse tutta aperta"
    },
    {
        "file": "TavolePrincipaliPosizioni3.webp",
        "alt": "Ecatorf valvola 2 aperta, coulisse chiusa"
    },
    {
        "file": "TavolePrincipaliPosizioni4.webp",
        "alt": "Ecatorf valvola 2 aperta, coulisse tutta aperta"
    },
    {
        "file": "TavolePrincipaliPosizioni5.webp",
        "alt": "Ecatorf posizione normale, coulisse chiusa"
    },
    {
        "file": "TavolePrincipaliPosizioni6.webp",
        "alt": "Ecatorf posizione normale, coulisse tutta aperta"
    },
    {
        "file": "TavolePrincipaliPosizioni7.webp",
        "alt": "Ecatorf valvola 3 aperta, coulisse chiusa"
    },
    {
        "file": "TavolePrincipaliPosizioni8.webp",
        "alt": "Ecatorf valvola 3 aperta, coulisse tutta aperta"
    }
];

export const designPages = sequence.map(({file, alt}) => ({
    src: images[`../assets/ecatorf/progettazione/${file}`],
    alt,
}));
