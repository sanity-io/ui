import * as stylex from '@stylexjs/stylex'

import {
  avatarArrowPlacement,
  avatarEditing,
  avatarStackChild,
  withGlobal,
} from '../../../stylex/globals'

const styles = stylex.create({
  root: {
    ':is([data-as="button"])': {
      WebkitFontSmoothing: 'inherit',
      appearance: 'none',
      borderColor: 'currentcolor',
      borderStyle: 'none',
      borderWidth: 0,
      color: 'inherit',
      font: 'inherit',
      margin: 0,
      outline: 'none',
      padding: 0,
    },
    ':is([data-status="inactive"])': {opacity: 0.5},
    'backgroundColor': 'var(--avatar-bg-color)',
    'borderRadius': 'calc(var(--avatar-size) / 2)',
    'boxShadow': '0 0 0 1px var(--card-bg-color)',
    'boxSizing': 'border-box',
    'height': 'var(--avatar-size)',
    'position': 'relative',
    'userSelect': 'none',
    'width': 'var(--avatar-size)',
  },
  arrow: {
    bottom: 0,
    boxSizing: 'border-box',
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transform: 'rotate(-90deg) translate3d(0, 6px, 0)',
    transition: 'all 0.2s linear',
    zIndex: 0,
  },
  image: {
    ':not([hidden])': {display: 'block'},
    'borderRadius': '50%',
    'height': 'var(--avatar-size)',
    'objectFit': 'contain',
    'position': 'relative',
    'width': 'var(--avatar-size)',
  },
  strokes: {
    borderRadius: '50%',
    height: 'var(--avatar-size)',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: 'var(--avatar-size)',
  },
  bgStroke: {
    stroke: 'var(--card-bg-color)',
    strokeWidth: '4px',
  },
  stroke: {
    stroke: 'var(--avatar-bg-color)',
    strokeWidth: '2px',
  },
  stack: {whiteSpace: 'nowrap'},
  counter: {
    ':not([hidden])': {display: 'flex'},
    'alignItems': 'center',
    'backgroundColor': 'var(--card-bg-color)',
    'backgroundImage': 'none',
    'boxShadow': '0 0 0 1px var(--card-bg-color), inset 0 0 0 1px var(--card-hairline-hard-color)',
    'boxSizing': 'border-box',
    'color': 'var(--card-fg-color)',
    'justifyContent': 'center',
    'userSelect': 'none',
  },
  initials: {
    ':not([hidden])': {display: 'flex'},
    'alignItems': 'center',
    'borderRadius': '50%',
    'color': 'var(--avatar-fg-color)',
    'height': '100%',
    'justifyContent': 'center',
    'textAlign': 'center',
    'textTransform': 'uppercase',
    'width': '100%',
  },
})

export const avatarRoot = stylex.props(styles.root).className ?? ''
export const avatarArrow = withGlobal(stylex.props(styles.arrow).className, avatarArrowPlacement)
export const avatarImage = stylex.props(styles.image).className ?? ''
export const avatarStrokes = stylex.props(styles.strokes).className ?? ''
export const avatarBgStroke = stylex.props(styles.bgStroke).className ?? ''
export const avatarStroke = withGlobal(stylex.props(styles.stroke).className, avatarEditing)
export const avatarStack = withGlobal(stylex.props(styles.stack).className, avatarStackChild)
export const avatarCounter = stylex.props(styles.counter).className ?? ''
export const avatarInitials = stylex.props(styles.initials).className ?? ''
