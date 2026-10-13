import {css} from '#styled-system/css'

// Limits the width of tabs in the tablist
export const tabList = css({
  '& > div': {
    display: 'inline-block',
    verticalAlign: 'middle',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
})
