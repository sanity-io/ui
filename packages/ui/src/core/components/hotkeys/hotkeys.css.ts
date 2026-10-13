import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    ':not([hidden])': {display: 'block'},
    'font': 'inherit',
    'padding': '1px',
  },
})

export const hotkeys = stylex.props(styles.root).className ?? ''
