import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    ':not([hidden])': {display: 'inline-block'},
    'position': 'relative',
  },
})

export const radio = stylex.props(styles.root).className ?? ''
