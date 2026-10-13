import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    bottom: 0,
    boxSizing: 'border-box',
    listStyle: 'none',
    maxWidth: '420px',
    pointerEvents: 'none',
    position: 'fixed',
    right: 0,
    width: '100%',
  },
})

export const toastLayer = stylex.props(styles.root).className ?? ''
