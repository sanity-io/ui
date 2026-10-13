import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  left: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
  right: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  clear: {
    ':not([hidden])': {display: 'block'},
  },
})

export const textInputLeftBox = stylex.props(styles.left).className ?? ''
export const textInputRightBox = stylex.props(styles.right).className ?? ''
export const textInputClearButton = stylex.props(styles.clear).className ?? ''
