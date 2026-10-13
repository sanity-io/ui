import * as stylex from '@stylexjs/stylex'

import {toastProgress, withGlobal} from '../../../stylex/globals'

const clip = stylex.firstThatWorks('clip', 'hidden')

const styles = stylex.create({
  root: {
    ':is([data-has-duration])': {paddingBottom: 'calc(2px / 2)'},
    'overflow': clip,
    'pointerEvents': 'all',
    'position': 'relative',
    'width': '100%',
  },
  text: {overflowX: 'auto'},
  bar: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    bottom: '0px',
    display: 'flex',
    left: '0px',
    overflow: clip,
    pointerEvents: 'none',
    position: 'absolute',
    right: '0px',
    top: '0px',
    willChange: 'opacity',
    zIndex: -1,
  },
  mask: {
    bottom: '2px',
    left: '-2px',
    position: 'absolute',
    right: '-2px',
    top: 0,
    zIndex: 1,
  },
  progress: {
    display: 'block',
    height: '100%',
    transformOrigin: '0% 50%',
    width: '100%',
  },
})

export const toast = stylex.props(styles.root).className ?? ''
export const toastText = stylex.props(styles.text).className ?? ''
export const loadingBar = stylex.props(styles.bar).className ?? ''
export const loadingBarMask = stylex.props(styles.mask).className ?? ''
export const loadingBarProgress = withGlobal(stylex.props(styles.progress).className, toastProgress)
