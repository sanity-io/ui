import * as stylex from '@stylexjs/stylex'

import {buttonLabel, withGlobal} from '../../../stylex/globals'

const styles = stylex.create({
  root: {
    '::-moz-focus-inner': {
      borderColor: 'currentcolor',
      borderStyle: 'none',
      borderWidth: 0,
      padding: 0,
    },
    'WebkitFontSmoothing': 'inherit',
    'alignItems': 'center',
    'appearance': 'none',
    'borderColor': 'currentcolor',
    'borderStyle': 'none',
    'borderWidth': 0,
    'boxSizing': 'border-box',
    'display': 'inline-flex',
    'font': 'inherit',
    'outline': 'none',
    'padding': 0,
    'position': 'relative',
    'textAlign': 'left',
    'textDecoration': 'none',
    'userSelect': 'none',
    'verticalAlign': 'top',
    'whiteSpace': 'nowrap',
  },
  fill: {
    width: stylex.firstThatWorks('stretch', '-webkit-fill-available', '-moz-available'),
  },
  loading: {
    alignItems: 'center',
    backgroundColor: 'var(--card-bg-color)',
    borderRadius: 'inherit',
    bottom: 0,
    boxShadow: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
})

export const buttonRoot = withGlobal(stylex.props(styles.root).className, buttonLabel)
export const buttonWidthFill = stylex.props(styles.fill).className ?? ''
export const buttonLoadingBox = stylex.props(styles.loading).className ?? ''
