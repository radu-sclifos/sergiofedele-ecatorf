import type { ImageMetadata } from 'astro';

const images = import.meta.glob<ImageMetadata>('../assets/musica/carosello/*.webp', {eager: true, import: 'default'});

export const kwatzPhotos = [
    {src: images['../assets/musica/carosello/Sergio_DSC_0120.webp'], alt: 'Sergio Fedele alle percussioni'},
    {src: images['../assets/musica/carosello/Enrico_DSC_0122.webp'], alt: 'Enrico Caimi alle percussioni'},
    {src: images['../assets/musica/carosello/DSC_0113.webp'], alt: 'Kwatz! in concerto'},
    {src: images['../assets/musica/carosello/Foto_Davide_2.webp'], alt: 'Davide Negrini alle percussioni'},
    {src: images['../assets/musica/carosello/kwatz_euganea_rottami.webp'], alt: 'Kwatz! a Euganea Rottami'},
    {src: images['../assets/musica/carosello/locandina_kwatz.webp'], alt: 'Locandina di Kwatz!'},
    {src: images['../assets/musica/carosello/Davide_Negrini.webp'], alt: 'Davide Negrini'},
    {src: images['../assets/musica/carosello/Enrico_Caimi.webp'], alt: 'Enrico Caimi'},
    {src: images['../assets/musica/carosello/punto_di_domanda.webp'], alt: 'Punto di domanda — Kwatz!'},
    {src: images['../assets/musica/carosello/sergio_e_roberto.webp'], alt: 'Sergio Fedele e Roberto Dani'},
    {src: images['../assets/musica/carosello/Soccomberanno.webp'], alt: 'Soccomberanno — Kwatz!'},
    {src: images['../assets/musica/carosello/Kwatz.webp'], alt: 'Kwatz! Ensemble'},
    {src: images['../assets/musica/carosello/locandinaVenda.webp'], alt: 'Locandina del concerto al Venda'},
    {src: images['../assets/musica/carosello/anfiteatro1.webp'], alt: 'Kwatz! in anfiteatro, fotografia 1'},
    {src: images['../assets/musica/carosello/anfiteatro2.webp'], alt: 'Kwatz! in anfiteatro, fotografia 2'},
    {src: images['../assets/musica/carosello/anfiteatro3.webp'], alt: 'Kwatz! in anfiteatro, fotografia 3'},
    {src: images['../assets/musica/carosello/anfiteatro4.webp'], alt: 'Kwatz! in anfiteatro, fotografia 4'},
    {src: images['../assets/musica/carosello/anfiteatro5.webp'], alt: 'Kwatz! in anfiteatro, fotografia 5'},
];
