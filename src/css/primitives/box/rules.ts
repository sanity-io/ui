import type {Rules} from '../../types'

export const boxRules: Rules = {
  'box': {
    'minWidth': 0,
    'minHeight': 0,

    '@nest': {
      // 'ul.&, ol.&': {
      '&[data-as="ul"], &[data-as="ol"]': {
        listStyle: 'none',
      },

      '&.muted': {
        backgroundColor: 'var(--color-muted-bg)',
      },
    },
  },

  // sizing

  'box-content': {
    boxSizing: 'content-box',
  },

  'box-border': {
    boxSizing: 'border-box',
  },
}
