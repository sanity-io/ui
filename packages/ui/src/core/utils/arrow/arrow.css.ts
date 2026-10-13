import * as stylex from '@stylexjs/stylex'

import {arrowPlacement, withGlobal} from '../../../stylex/globals'

const styles = stylex.create({
  root: {
    height: 'var(--sui-arrow-size)',
    position: 'absolute',
    width: 'var(--sui-arrow-size)',
  },
  stroke: {stroke: 'var(--card-shadow-outline-color)'},
  shape: {fill: 'var(--card-bg-color)'},
})

export const arrow = withGlobal(stylex.props(styles.root).className, arrowPlacement)
export const arrowStroke = stylex.props(styles.stroke).className ?? ''
export const arrowShape = stylex.props(styles.shape).className ?? ''
