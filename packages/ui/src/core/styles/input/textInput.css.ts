import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {alignItems: 'center'},
  area: {
    ':not([hidden])': {display: 'flex'},
  },
  input: {
    display: 'block',
    flex: 1,
    minWidth: 0,
    position: 'relative',
  },
})

export const textInputRoot = stylex.props(styles.root).className ?? ''
export const textAreaRoot = stylex.props(styles.root, styles.area).className ?? ''
export const inputRoot = stylex.props(styles.input).className ?? ''
