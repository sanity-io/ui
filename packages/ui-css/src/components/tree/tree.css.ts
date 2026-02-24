import {globalStyle} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(
  _layers.component,
  {
    outline: 'none',
    selectors: {
      // '&[role="tree"]': {
      //   outline: 'none',
      // },

      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1,
        borderRadius: 'inherit',
        // @ts-expect-error - `cornerShape` is not yet fully supported in CSS
        cornerShape: 'inherit',
        // boxShadow: vars.focusRing.inset,
      },

      '&:has(:focus:focus-visible)::before': {
        // boxShadow: vars.focusRing.default,
        boxShadow: vars.focusRing.inset,
      },
    },
  },
  'root',
)

export const item: string = _style(
  _layers.component,
  {
    selectors: {
      '&[role="treeitem"]': {
        outline: 'none',
      },
    },
  },
  'item',
)

globalStyle(`${item}[role="none"] > [role="treeitem"]`, {
  '@layer': {
    [_layers.component]: {
      outline: 'none',
      cursor: 'default',
      // borderRadius: '3px',

      backgroundColor: vars.color.bg,
      color: vars.color.fg,
    },
  },
})

globalStyle(`${item}[role="none"] > [role="treeitem"]:focus`, {
  '@layer': {
    [_layers.component]: {
      position: 'relative',
    },
  },
})

globalStyle(`${item}[role="treeitem"] > div`, {
  '@layer': {
    [_layers.component]: {
      cursor: 'default',
      borderRadius: '3px',

      backgroundColor: vars.color.bg,
      color: vars.color.fg,
    },
  },
})

globalStyle(`${item}[role="treeitem"] > div`, {
  '@layer': {
    [_layers.component]: {
      cursor: 'default',
      borderRadius: '3px',
      backgroundColor: vars.color.bg,
      color: vars.color.fg,
    },
  },
})

globalStyle(`${item}[role="treeitem"]:focus > div`, {
  '@layer': {
    [_layers.component]: {
      position: 'relative',
    },
  },
})
