import {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.kbd': {
    // '--color-bg': 'var(--color-tinted-default-bg-1)',
    // '--color-border': 'var(--color-tinted-default-border-2)',
    // '--color-fg': 'var(--color-tinted-default-fg-3)',

    'boxShadow': 'inset 0 0 0 0.5px var(--color-tinted-default-border-3)',
    'background': 'var(--color-muted-bg)',
    'font': 'inherit',
    'verticalAlign': 'top',

    '@nest': {
      '&:not([hidden])': {
        display: 'inline-block',
      },
    },
  },
}

export const kbdStyle: Style = {layers: {primitive}}
