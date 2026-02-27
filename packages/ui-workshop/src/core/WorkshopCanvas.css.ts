import {createVar, createViewTransition, style} from '@vanilla-extract/css'
import {calc} from '@vanilla-extract/css-utils'

export const viewportMaxHeight = createVar('viewport-max-height')
export const viewportMaxWidth = createVar('viewport-max-width')

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

export const iframeContainer = style({
  selectors: {
    '&&&': {
      maxWidth: calc.multiply(viewportMaxWidth, zoom),
      maxHeight: calc.multiply(viewportMaxHeight, zoom),
    },
  },
})
