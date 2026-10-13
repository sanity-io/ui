import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {position: 'relative'},
  item: {
    left: 0,
    position: 'absolute',
    right: 0,
  },
})

export const virtualList = stylex.props(styles.root).className ?? ''
export const virtualListItem = stylex.props(styles.item).className ?? ''
