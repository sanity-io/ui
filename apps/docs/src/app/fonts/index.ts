import localFont from 'next/font/local'

export const waldenburgNormal = localFont({
  src: [
    {
      path: './waldenburg-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './waldenburg-normal-kursiv.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './waldenburg-fett.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  preload: true,
})
