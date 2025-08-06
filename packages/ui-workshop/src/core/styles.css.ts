import {
  createVar,
  createViewTransition,
  globalFontFace,
  globalStyle,
  style,
} from '@vanilla-extract/css'
import {calc} from '@vanilla-extract/css-utils'

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

globalStyle('html', {
  WebkitTextSizeAdjust: '100%',
  textSizeAdjust: '100%',
  WebkitTapHighlightColor: 'transparent',
  WebkitFontSmoothing: 'antialiased',
})

globalStyle('html, body, #root', {
  height: '100%',
  margin: 0,
})

export const bodyBackgroundColor = createVar(
  {
    syntax: '<color>',
    inherits: false,
    initialValue: '#fff',
  },
  'body-background-color',
)
globalStyle('body', {
  backgroundColor: bodyBackgroundColor,
})

export const canvasViewTransition = createViewTransition('canvas')
export const zoom = createVar(
  {
    syntax: '<number>',
    inherits: true,
    initialValue: '1',
  },
  'zoom',
)
export const iframe = style({
  display: 'block',
  border: 0,
  transform: `scale(${zoom})`,
  transformOrigin: '0 0',
  height: calc.divide('100%', zoom),
  width: calc.divide('100%', zoom),
  viewTransitionName: canvasViewTransition,
})

export const viewportMaxWidth = createVar('viewport-max-width')
export const viewportMaxHeight = createVar('viewport-max-height')
export const iframeContainer = style({
  selectors: {
    '&&&': {
      maxWidth: calc.multiply(viewportMaxWidth, zoom),
      maxHeight: calc.multiply(viewportMaxHeight, zoom),
    },
  },
})

const workshopAside = style({
  'overflow': 'hidden',
  '@media': {
    'screen and (min-width: 600px)': {
      maxWidth: '300px',
      overflow: 'auto',
      selectors: {
        '&&': {
          minWidth: '180px',
        },
      },
    },
  },
})

export const workshopInspector = style([
  workshopAside,
  {
    '@media': {
      'screen and (min-width: 600px)': {
        borderLeft: `1px solid var(--card-border-color)`,
      },
    },
  },
])

export const workshopNavigator = style([
  workshopAside,
  {
    '@media': {
      'screen and (min-width: 600px)': {
        borderRight: `1px solid var(--card-border-color)`,
      },
    },
  },
])

export const inspectorHeader = style({
  selectors: {
    '&&': {
      flex: 'none',
      position: 'sticky',
      top: 0,
    },
  },
})

export const inspectorHeaderCard = style({
  'lineHeight': 0,
  '@media': {
    'screen and (max-width: 599px)': {
      textAlign: 'center',
    },
  },
})
