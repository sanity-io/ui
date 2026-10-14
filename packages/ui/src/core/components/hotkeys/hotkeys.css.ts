import {css} from '#styled-system/css'

export const hotkeys = css({
  'font': 'inherit',
  'padding': '1px',
  '&:not([hidden])': {
    display: 'block',
  },
})
