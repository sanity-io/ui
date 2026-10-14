import {css, firstThatWorks} from '#styled-system/css'

export const select = css({
  'position': 'relative',
  'width': firstThatWorks('stretch', '-webkit-fill-available', '-moz-available'),
  '&:not([hidden])': {
    display: 'inline-block',
  },
})
