import {css, firstThatWorks} from '#styled-system/css'

export const srOnly = css({
  display: 'block',
  width: 0,
  height: 0,
  position: 'absolute',
  overflow: firstThatWorks('clip', 'hidden'),
})
