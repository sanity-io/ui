import {fadeIn, zoomIn} from '../../keyframes/dialog.css'
import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

export const root: string = _style(
  _layers.component,
  {
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',

    background: vars.color.backdrop,

    selectors: {
      '&[data-animate]': {
        animation: `${fadeIn} 200ms ease-out`,
      },
    },
  },
  '',
)

export const card: string = _style(
  _layers.component,
  {
    width: '100%',
    maxHeight: '100%',
    overflow: ['hidden', 'clip'],

    selectors: {
      '[data-animate] > &': {
        animation: `${zoomIn} 200ms ease-out`,
      },
    },
  },
  'card',
)

export const container: string = _style(
  _layers.component,
  {
    width: '100%',
    height: '100%',
  },
  'container',
)

export const scroller: string = _style(
  _layers.component,
  {
    width: '100%',
    height: '100%',
    // overflow: 'auto',
    outline: 'none',
  },
  'scroller',
)

export const scrollerShadowTop: string = _style(
  _layers.component,
  {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(to top, color-mix(in srgb,transparent, ${vars.color.shadow.penumbra} 0%) 0%, color-mix(in srgb, ${vars.color.shadow.umbra} 100%, transparent 100%) 100%)`,
    boxShadow: `inset 0 0.5px 0 color-mix(in srgb, transparent, ${vars.color.shadow.outline} 50%)`,
    pointerEvents: 'none',
  },
  'scroller-shadow-top',
)

export const scrollerShadowBottom: string = _style(
  _layers.component,
  {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(to bottom, color-mix(in srgb,transparent, ${vars.color.shadow.penumbra} 0%) 0%, color-mix(in srgb, ${vars.color.shadow.umbra} 100%, transparent 100%) 100%)`,
    boxShadow: `inset 0 -0.5px 0 color-mix(in srgb, transparent, ${vars.color.shadow.outline} 50%)`,
    pointerEvents: 'none',
  },
  'scroller-shadow-bottom',
)

export const header: string = _style(
  _layers.component,
  {
    zIndex: 2,
  },
  'header',
)

export const content: string = _style(
  _layers.component,
  {
    zIndex: 1,
    outline: 'none',
  },
  'content',
)

export const footer: string = _style(
  _layers.component,
  {
    zIndex: 3,
  },
  'footer',
)
