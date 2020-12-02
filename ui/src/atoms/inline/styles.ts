import {css} from 'styled-components'
import {Theme} from '../../theme'

function rem(px: number) {
  return `${px / 16}rem`
}

export function inlineBaseStyles() {
  return css`
    &&:not([hidden]) {
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

export function inlineSpaceStyles(props: {space: number[]; theme: Theme}) {
  const {theme} = props

  return css`
    ${props.space.map((spaceIndex, mqIndex) => {
      const space = rem(theme.sanity.space[spaceIndex])

      if (mqIndex === 0)
        return css`
          margin: -${space} 0 0 -${space};

          & > div {
            padding: ${space} 0 0 ${space};
          }
        `

      return css`
        @media (min-width: ${theme.sanity.media[mqIndex - 1] / 16}rem) {
          margin: -${space} 0 0 -${space};

          & > div {
            padding: ${space} 0 0 ${space};
          }
        }
      `
    })}
  `
}
