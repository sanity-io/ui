import * as stylex from '@stylexjs/stylex'

const rotate = stylex.keyframes({
  from: {transform: 'rotate(0deg)'},
  to: {transform: 'rotate(360deg)'},
})

const size = 'round(1em, 2px)'

const styles = stylex.create({
  icon: {
    animationDuration: '500ms',
    animationIterationCount: 'infinite',
    animationName: rotate,
    animationTimingFunction: 'linear',
    height: size,
    width: size,
  },
})

export const spinnerIcon = stylex.props(styles.icon).className ?? ''
