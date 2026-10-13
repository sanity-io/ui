import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    outline: 'none',
    overflow: 'auto',
  },
})

export const menu = stylex.props(styles.root).className ?? ''
