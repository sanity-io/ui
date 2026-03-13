import {globalFontFace} from '@vanilla-extract/css'

const fontDisplay: FontDisplay = 'swap'

globalFontFace('Inter', [
  {
    src: `url('https://studio-static.sanity.io/Inter-Regular.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-Italic.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-Medium.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-MediumItalic.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-SemiBold.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-SemiBoldItalic.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-Bold.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-BoldItalic.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'italic',
    fontWeight: '700',
  },
])
