import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    backgroundColor: 'var(--card-hairline-soft-color)',
    backgroundImage: 'none',
    borderColor: 'currentcolor',
    borderStyle: 'none',
    borderWidth: 0,
    height: '1px',
    margin: 0,
  },
})

export const menuDivider = stylex.props(styles.root).className ?? ''
