import {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const component: StyleRules = {
  '.tree-item': {
    '@nest': {
      '&[role="none"] > [role="treeitem"]': {
        outline: 'none',
        cursor: 'default',
        borderRadius: '3px',

        backgroundColor: vars.color.bg, // 'var(--card-bg-color)',
        color: 'var(--treeitem-fg-color)',
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

        backgroundColor: vars.color.bg, // 'var(--card-bg-color)',
        color: 'var(--treeitem-fg-color)',
      },

      '&[role="treeitem"]:focus > div': {
        position: 'relative',
      },

      // &[role='treeitem'] {
      //   outline: none;

      //   & > div {
      //     cursor: default;
      //     border-radius: 3px;

      //     background-color: var(--card-bg-color);
      //     color: var(--treeitem-fg-color);
      //   }

      //   &:focus > div {
      //     position: relative;
      //   }
      // }
    },
  },
}

export const treeStyle: Style = {layers: {component}}
