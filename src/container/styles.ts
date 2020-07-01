import {css} from 'styled-components'
import {Theme} from '../theme'

function rem(px: number) {
  return `${px / 16}rem`
}

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
          max-width: ${rem(container[spaceIndex])};
        `

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          max-width: ${rem(container[spaceIndex])};
        }
      `
    })}
  `
}
