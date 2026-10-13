import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    lineHeight: 0,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    whiteSpace: 'nowrap',
  },
  expand: {
    appearance: 'none',
  },
})

export const breadcrumbs = stylex.props(styles.root).className ?? ''
export const expandButton = stylex.props(styles.expand).className ?? ''
