import {css} from 'styled-components'
import {Theme} from '../theme'

export function containerBaseStyles() {
  return css`
    margin: 0 auto;
  `
}

export function containerWidthStyles(props: {theme: Theme; width: number[]}) {
  const {container} = props.theme

  return css`
    ${props.width.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          max-width: ${container[spaceIndex] / 16}rem;
        `

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          max-width: ${container[spaceIndex] / 16}rem;
        }
      `
    })}
  `
}
