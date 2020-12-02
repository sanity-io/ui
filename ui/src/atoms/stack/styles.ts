import {css} from 'styled-components'
import {Theme} from '../../theme'

function rem(px: number) {
  return `${px / 16}rem`
}

export function stackBaseStyles() {
  return css`
    &&:not([hidden]) {
      display: grid;
    }
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: min-content;
    margin: 0;
    padding: 0;
  `
}

export function stackSpaceStyles(props: {space: number[]; theme: Theme}) {
  const {theme} = props

  return css`
    ${props.space.map((spaceIndex, mqIndex) => {
      const space = rem(theme.sanity.space[spaceIndex])

      if (mqIndex === 0) {
        return css`
          grid-gap: ${space};
        `
      }

      return css`
        @media (min-width: ${theme.sanity.media[mqIndex - 1] / 16}rem) {
          grid-gap: ${space};
        }
      `
    })}
  `
}
