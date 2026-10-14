import {css, firstThatWorks} from '#styled-system/css'

export const spanWithTextOverflow = css({
  display: 'block',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: firstThatWorks('clip', 'hidden'),
})
