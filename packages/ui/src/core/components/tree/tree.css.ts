import * as stylex from '@stylexjs/stylex'

import {treeItemChildren, withGlobal} from '../../../stylex/globals'

const styles = stylex.create({
  item: {
    ':is([role="treeitem"])': {outline: 'none'},
  },
  arrow: {
    transition: 'transform 100ms',
  },
})

export const treeItem = withGlobal(stylex.props(styles.item).className, treeItemChildren)
export const treeItemToggleArrow = stylex.props(styles.arrow).className ?? ''
