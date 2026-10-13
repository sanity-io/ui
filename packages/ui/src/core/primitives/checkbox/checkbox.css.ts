import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    display: 'inline-block',
    position: 'relative',
  },
})

export const checkbox = stylex.props(styles.root).className ?? ''
