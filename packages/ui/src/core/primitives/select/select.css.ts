import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    ':not([hidden])': {display: 'inline-block'},
    'position': 'relative',
    'width': stylex.firstThatWorks('stretch', '-webkit-fill-available', '-moz-available'),
  },
})

export const select = stylex.props(styles.root).className ?? ''
