import {vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const component: StyleRules = {
  '.tree-item': {
    nest: {
      '&[role="none"] > [role="treeitem"]': {
        outline: 'none',
        cursor: 'default',
        borderRadius: '3px',

        backgroundColor: vars.color.bg,
        color: vars.color.fg,
      },

      '&[role="none"] > [role="treeitem"]:focus': {
        position: 'relative',
      },

      '&[role="treeitem"]': {
        outline: 'none',
      },

      '&[role="treeitem"] > div': {
        cursor: 'default',
        borderRadius: '3px',

        backgroundColor: vars.color.bg,
        color: vars.color.fg,
      },

      '&[role="treeitem"]:focus > div': {
        position: 'relative',
      },
    },
  },
}

export const treeStyle: Style = {layers: {component}}
