import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  layer: {pointerEvents: 'none'},
  card: {willChange: 'transform'},
})

export const tooltipLayer = stylex.props(styles.layer).className ?? ''
export const tooltipCard = stylex.props(styles.card).className ?? ''
