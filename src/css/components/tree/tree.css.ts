import {globalStyle} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const item = _style(layers.components, {
  selectors: {
    '&[role="treeitem"]': {
      outline: 'none',
    },
  },
})

globalStyle(`${item}[role="none"] > [role="treeitem"]`, {
  '@layer': {
    [layers.components]: {
      outline: 'none',
      cursor: 'default',
      borderRadius: '3px',

      backgroundColor: vars.color.bg,
      color: vars.color.fg,
    },
  },
})

globalStyle(`${item}[role="none"] > [role="treeitem"]:focus`, {
  '@layer': {
    [layers.components]: {
      position: 'relative',
    },
  },
})

globalStyle(`${item}[role="treeitem"] > div`, {
  '@layer': {
    [layers.components]: {
      cursor: 'default',
      borderRadius: '3px',

      backgroundColor: vars.color.bg,
      color: vars.color.fg,
    },
  },
})

globalStyle(`${item}[role="treeitem"] > div`, {
  '@layer': {
    [layers.components]: {
      cursor: 'default',
      borderRadius: '3px',
      backgroundColor: vars.color.bg,
      color: vars.color.fg,
    },
  },
})

globalStyle(`${item}[role="treeitem"]:focus > div`, {
  '@layer': {
    [layers.components]: {
      position: 'relative',
    },
  },
})
