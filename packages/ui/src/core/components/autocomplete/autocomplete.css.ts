import {css} from '#styled-system/css'

export const autocomplete = css({
  lineHeight: 0,
})

export const autocompleteListBox = css({
  '& > ul': {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
})
