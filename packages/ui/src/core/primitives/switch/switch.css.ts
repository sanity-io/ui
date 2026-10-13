import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    ':not([hidden])': {display: 'inline-block'},
    'position': 'relative',
  },
  input: {
    bottom: 0,
    height: '100%',
    left: 0,
    margin: 0,
    opacity: 0,
    outline: 'none',
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  representation: {
    '::after': {
      borderRadius: 'inherit',
      bottom: 0,
      boxShadow: 'var(--switch-box-shadow)',
      content: '""',
      display: 'block',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    ':not([hidden])': {display: 'block'},
    '--switch-box-shadow': 'none',
    'pointerEvents': 'none',
    'position': 'relative',
  },
  track: {
    ':not([hidden])': {display: 'block'},
    'backgroundColor': 'var(--switch-bg-color)',
    'left': 0,
    'position': 'absolute',
    'top': 0,
  },
  thumb: {
    ':not([hidden])': {display: 'block'},
    'backgroundColor': 'var(--switch-fg-color)',
    'backgroundImage': 'none',
    'boxShadow': '0px 1px 0px 0px rgba(0, 0, 0, 0.05)',
    'position': 'absolute',
    'transitionProperty': 'transform',
  },
})

export const switchRoot = stylex.props(styles.root).className ?? ''
export const switchInput = stylex.props(styles.input).className ?? ''
export const switchRepresentation = stylex.props(styles.representation).className ?? ''
export const switchTrack = stylex.props(styles.track).className ?? ''
export const switchThumb = stylex.props(styles.thumb).className ?? ''
