import {css} from 'styled-components'
import {getResponsiveProp, responsive, ThemeProps} from '../../styles'

function rem(px: number) {
  return `${px / 16}rem`
}

export function inlineBaseStyles() {
  return css`
    &:not([hidden]) {
      display: block;
    }

    & > div:not([hidden]) {
      display: inline-block;
    }

    & > div {
      vertical-align: middle;
    }
  `
}

export function inlineSpaceStyles(props: {space?: number | number[]} & ThemeProps) {
  const {theme} = props

  return responsive(theme.sanity.media, getResponsiveProp(props.space), (spaceIndex) => {
    const space = rem(theme.sanity.space[spaceIndex])

    return {
      margin: `-${space} 0 0 -${space}`,
      '& > div': {padding: `${space} 0 0 ${space}`},
    }
  })
}
