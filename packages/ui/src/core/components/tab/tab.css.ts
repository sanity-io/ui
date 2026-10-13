import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {maxWidth: '100%'},
})

export const tab = stylex.props(styles.root).className ?? ''
