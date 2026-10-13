import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    display: 'block',
    height: 0,
    overflow: stylex.firstThatWorks('clip', 'hidden'),
    position: 'absolute',
    width: 0,
  },
})

export const srOnly = stylex.props(styles.root).className ?? ''
