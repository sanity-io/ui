import {css} from 'styled-components'
import {responsive, ThemeProps} from '../../styles'

function rem(px: number) {
  return `${px / 16}rem`
}

export function stackBaseStyles() {
  return css`
    &:not([hidden]) {
      display: grid;
    }
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: min-content;
    margin: 0;
    padding: 0;
  `
}

export function stackSpaceStyles(props: {space: number[]} & ThemeProps) {
  const {theme} = props

  return responsive(theme.sanity.media, props.space, (spaceIndex) => ({
    gridGap: rem(theme.sanity.space[spaceIndex]),
  }))
}
