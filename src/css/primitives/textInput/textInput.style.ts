import {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const primitive: StyleRules = {
  '.text-input': {
    '--font-family': vars.font.text.family,

    '@nest': {
      '& > span': {
        borderRadius: 'inherit',
      },
    },
  },

  '.text-input-prefix': {
    'borderTop': '1px solid var(--color-border)',
    'borderLeft': '1px solid var(--color-border)',
    'borderBottom': '1px solid var(--color-border)',
    'borderTopRightRadius': '0 !important',
    'borderBottomRightRadius': '0 !important',

    '@nest': {
      '& > span': {
        display: 'block',
        margin: '-1px',
      },
    },
  },

  '.text-input-suffix': {
    'borderTop': '1px solid var(--color-border)',
    'borderRight': '1px solid var(--color-border)',
    'borderBottom': '1px solid var(--color-border)',
    'borderTopLeftRadius': '0 !important',
    'borderBottomLeftRadius': '0 !important',

    '@nest': {
      '& > span': {
        display: 'block',
        margin: '-1px',
      },
    },
  },

  '.text-input-presentation': {},
}

export const textInputStyle: Style = {layers: {primitive}}
