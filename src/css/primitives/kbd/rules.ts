import {Rules} from '../../types'

export const kbdRules: Rules = {
  kbd: {
    '--card-bg-color': 'var(--card-kbd-bg-color)',
    '--card-border-color': 'var(--card-kbd-border-color)',
    '--card-fg-color': 'var(--card-kbd-fg-color)',

    'boxShadow': 'inset 0 0 0 1px var(--card-border-color)',
    'background': 'var(--card-bg-color)',
    'font': 'inherit',
    'verticalAlign': 'top',

    '@nest': {
      '&:not([hidden])': {
        display: 'inline-block',
      },
    },
  },
}
