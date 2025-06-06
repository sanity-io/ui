import {keyframes} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

const zoomIn = keyframes({
  // '@layer': {
  //   [layers.components]: {
  from: {
    opacity: 0,
    transform: 'scale(0.95)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1)',
  },
  //   },
  // },
})

const fadeIn = keyframes({
  // '@layer': {
  //   [layers.components]: {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
  //   },
  // },
})

export const root = _style(layers.components, {
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',

  background: vars.color.backdrop,

  selectors: {
    '&[data-animate]': {
      animation: `${fadeIn} 200ms ease-out`,
    },
  },
})

export const card = _style(layers.components, {
  width: '100%',
  maxHeight: '100%',
  overflow: ['hidden', 'clip'],

  selectors: {
    '[data-animate] > &': {
      animation: `${zoomIn} 200ms ease-out`,
    },
  },
})

export const container = _style(layers.components, {
  width: '100%',
  height: '100%',
})

export const scroller = _style(layers.components, {
  width: '100%',
  height: '100%',
  // overflow: 'auto',
  outline: 'none',
})

export const scrollerShadowTop = _style(layers.components, {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 4,
  background: `linear-gradient(to top, color-mix(in srgb,transparent, ${vars.color.shadow.penumbra} 0%) 0%, color-mix(in srgb, ${vars.color.shadow.umbra} 100%, transparent 100%) 100%)`,
  boxShadow: `inset 0 0.5px 0 color-mix(in srgb, transparent, ${vars.color.shadow.outline} 50%)`,
  pointerEvents: 'none',
})

export const scrollerShadowBottom = _style(layers.components, {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 4,
  background: `linear-gradient(to bottom, color-mix(in srgb,transparent, ${vars.color.shadow.penumbra} 0%) 0%, color-mix(in srgb, ${vars.color.shadow.umbra} 100%, transparent 100%) 100%)`,
  boxShadow: `inset 0 -0.5px 0 color-mix(in srgb, transparent, ${vars.color.shadow.outline} 50%)`,
  pointerEvents: 'none',
})

export const header = _style(layers.components, {
  zIndex: 2,
})

export const content = _style(layers.components, {
  zIndex: 1,
  outline: 'none',
})

export const footer = _style(layers.components, {
  zIndex: 3,
})
