import {css} from 'styled-components'
import {Theme} from '../theme'

function rem(px: number) {
  return `${px / 16}rem`
}

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
          padding: ${rem(space[spaceIndex])};
        `

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          padding: ${rem(space[spaceIndex])};
        }
      `
    })}

    ${props.paddingX.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-left: ${rem(space[spaceIndex])};
          padding-right: ${rem(space[spaceIndex])};
        `

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          padding-left: ${rem(space[spaceIndex])};
          padding-right: ${rem(space[spaceIndex])};
        }
      `
    })}

    ${props.paddingY.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-top: ${rem(space[spaceIndex])};
          padding-bottom: ${rem(space[spaceIndex])};
        `

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          padding-top: ${rem(space[spaceIndex])};
          padding-bottom: ${rem(space[spaceIndex])};
        }
      `
    })}

    ${props.paddingTop.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-top: ${rem(space[spaceIndex])};
        `

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          padding-top: ${rem(space[spaceIndex])};
        }
      `
    })}

    ${props.paddingBottom.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-bottom: ${rem(space[spaceIndex])};
        `

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          padding-bottom: ${rem(space[spaceIndex])};
        }
      `
    })}

    ${props.paddingLeft.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-left: ${rem(space[spaceIndex])};
        `

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          padding-left: ${rem(space[spaceIndex])};
        }
      `
    })}

    ${props.paddingRight.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          padding-right: ${rem(space[spaceIndex])};
        `

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          padding-right: ${rem(space[spaceIndex])};
        }
      `
    })}
  `
}

export function boxFlexStyles(props: {flex: number[]; theme: Theme}) {
  return css`
    ${props.flex.map((flex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          flex: ${flex};
        `

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          flex: ${flex};
        }
      `
    })}
  `
}
