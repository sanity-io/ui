import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {position: 'relative'},
})

export const layer = stylex.props(styles.root).className ?? ''
