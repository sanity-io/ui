import * as stylex from '@stylexjs/stylex'

import {autocompleteList} from '../../../stylex/globals'

const styles = stylex.create({
  root: {
    lineHeight: 0,
  },
})

export const autocomplete = stylex.props(styles.root).className ?? ''
export const autocompleteListBox = autocompleteList.className
