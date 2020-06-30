import {css} from 'styled-components'
import {Theme} from '../theme'

export function stackBaseStyles() {
  return css`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: min-content;
  `
}

export function stackSpaceStyles(props: {space: number[]; theme: Theme}) {
  const {space} = props.theme

  return css`
    ${props.space.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0) {
        return css`
          grid-gap: ${space[spaceIndex]}px;
        `
      }
      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          grid-gap: ${space[spaceIndex]}px;
        }
      `
    })}
  `
}
