import {css} from 'styled-components'
import {Theme} from '../theme'

export function inlineBaseStyles() {
  return css`
    display: block;

    & > div {
      display: inline-block;
      vertical-align: middle;
    }
  `
}

export function inlineSpaceStyles(props: {space: number[]; theme: Theme}) {
  const {space} = props.theme

  return css`
    ${props.space.map((spaceIndex, mqIndex) => {
      const ems = space[spaceIndex] / 16

      if (mqIndex === 0)
        return css`
          margin: -${ems}rem 0 0 -${ems}rem;

          & > div {
            padding: ${ems}rem 0 0 ${ems}rem;
          }
        `

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          margin: -${ems}rem 0 0 -${ems}rem;

          & > div {
            padding: ${ems}rem 0 0 ${ems}rem;
          }
        }
      `
    })}
  `
}
