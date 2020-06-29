import {css} from 'styled-components'
import {Theme} from '../theme'

export function boxPaddingStyles(props: {
  padding: number[]
  paddingX: number[]
  paddingY: number[]
  paddingTop: number[]
  paddingBottom: number[]
  paddingLeft: number[]
  paddingRight: number[]
  theme: Theme
}) {
  const {space} = props.theme

  return css`
    ${props.padding.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding: ${space[spaceIndex]}px;
        `

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          padding: ${space[spaceIndex]}px;
        }
      `
    })}

    ${props.paddingX.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-left: ${space[spaceIndex]}px;
          padding-right: ${space[spaceIndex]}px;
        `

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          padding-left: ${space[spaceIndex]}px;
          padding-right: ${space[spaceIndex]}px;
        }
      `
    })}

    ${props.paddingY.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-top: ${space[spaceIndex]}px;
          padding-bottom: ${space[spaceIndex]}px;
        `

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          padding-top: ${space[spaceIndex]}px;
          padding-bottom: ${space[spaceIndex]}px;
        }
      `
    })}

    ${props.paddingTop.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-top: ${space[spaceIndex]}px;
        `

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          padding-top: ${space[spaceIndex]}px;
        }
      `
    })}

    ${props.paddingBottom.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-bottom: ${space[spaceIndex]}px;
        `

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          padding-bottom: ${space[spaceIndex]}px;
        }
      `
    })}

    ${props.paddingLeft.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-left: ${space[spaceIndex]}px;
        `

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          padding-left: ${space[spaceIndex]}px;
        }
      `
    })}

    ${props.paddingRight.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-right: ${space[spaceIndex]}px;
        `

      return css`
        @media (min-width: ${props.theme.media[mqIndex - 1]}px) {
          padding-right: ${space[spaceIndex]}px;
        }
      `
    })}
  `
}
