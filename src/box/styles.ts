import {css} from 'styled-components'
import {Theme} from '../theme'

function applypaddingStyles(space: number) {
  return css`
    padding: ${space}px;
  `
}

export function boxPaddingStyles(props: {padding: number[]; theme: Theme}) {
  const {space} = props.theme

  return css`
    ${props.padding.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0) return applypaddingStyles(space[spaceIndex])

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          ${applypaddingStyles(space[spaceIndex])}
        }
      `
    })}
  `
}
