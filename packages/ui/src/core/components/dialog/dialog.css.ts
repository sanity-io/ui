import * as stylex from '@stylexjs/stylex'

import {dialogCardIn, withGlobal} from '../../../stylex/globals'

const fadeIn = stylex.keyframes({
  from: {opacity: 0},
  to: {opacity: 1},
})

const clip = stylex.firstThatWorks('clip', 'hidden')

const styles = stylex.create({
  layer: {
    ':not([hidden])': {display: 'flex'},
    'alignItems': 'center',
    'bottom': 0,
    'justifyContent': 'center',
    'left': 0,
    'outline': 'none',
    'right': 0,
    'top': 0,
  },
  animated: {
    animationDuration: '200ms',
    animationName: fadeIn,
    animationTimingFunction: 'ease-out',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    maxHeight: '100%',
    minHeight: 0,
    overflow: clip,
    width: '100%',
  },
  layout: {
    minHeight: 0,
    width: '100%',
  },
  header: {
    position: 'relative',
    zIndex: 2,
  },
  content: {
    outline: 'none',
    overflow: 'auto',
    position: 'relative',
    zIndex: 1,
  },
  footer: {
    position: 'relative',
    zIndex: 3,
  },
})

export const dialogLayer = stylex.props(styles.layer).className ?? ''
export const dialogAnimated = withGlobal(stylex.props(styles.animated).className, dialogCardIn)
export const dialogContainer = stylex.props(styles.container).className ?? ''
export const dialogCard = stylex.props(styles.card).className ?? ''
export const dialogLayout = stylex.props(styles.layout).className ?? ''
export const dialogHeader = stylex.props(styles.header).className ?? ''
export const dialogContent = stylex.props(styles.content).className ?? ''
export const dialogFooter = stylex.props(styles.footer).className ?? ''
