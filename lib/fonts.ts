// lib/fonts.ts
import localFont from 'next/font/local';

// Cargar la fuente PP Neue Corp Wide
export const neueCorp = localFont({
  src: [
    {
      path: '../public/fonts/PPNeueCorp-WideUltrabold.woff2',
      weight: '800',
      style: 'normal'
    }
  ],
  variable: '--font-neue-corp'
});

// Opcional: también puedes pre-descargar la fuente para evitar FOUT (Flash of Unstyled Text)
export function preloadNeueCorpFont() {
  return {
    rel: 'preload',
    href: '/fonts/PPNeueCorp-WideUltrabold.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  };
}
