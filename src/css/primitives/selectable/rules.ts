import {Rules} from '../../types'

export const selectableRules: Rules = {
  selectable: {
    'backgroundColor': 'inherit',
    'color': 'inherit',

    '@nest': {
      '&[data-as="button"]': {
        WebkitFontSmoothing: 'inherit',
        appearance: 'none',
        outline: 'none',
        font: 'inherit',
        textAlign: 'inherit',
        border: 0,
        // width: '-moz-available',
        // width: '-webkit-fill-available',
        width: 'stretch',
      },

      /* &:is(a) */
      '&[data-as="a"]': {
        textDecoration: 'none',
      },
    },
  },
}
