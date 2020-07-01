import {css} from 'styled-components'
import {Theme} from '../theme'

function rem(px: number) {
  return `${px / 16}rem`
}

export function stackBaseStyles() {
  return css`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: min-content;
  `
}

export function stackSpaceStyles(props: {space: number[]; theme: Theme}) {
  return css`
    ${props.space.map((spaceIndex, mqIndex) => {
      const space = rem(props.theme.space[spaceIndex])

      if (mqIndex === 0) {
        return css`
          grid-gap: ${space};
        `
      }
      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1] / 16}rem) {
          grid-gap: ${space};
        }
      `
    })}
  `
}
