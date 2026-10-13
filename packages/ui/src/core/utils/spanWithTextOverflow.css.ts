import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    display: 'block',
    overflow: stylex.firstThatWorks('clip', 'hidden'),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
})

export const spanWithTextOverflow = stylex.props(styles.root).className ?? ''
