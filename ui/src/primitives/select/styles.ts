import {css} from 'styled-components'
import {getResponsiveProp, rem, responsive, ThemeProps} from '../../styles'
import {borderStyle, focusRingStyle} from '../../styles/_internal/focusRing'
import {responsiveInputPaddingIconRightStyle, responsiveRadiusStyle} from '../../styles/internal'
import {ThemeFontSize} from '../../theme'

const root = () => {
  return css`
    position: relative;
    width: stretch;

    &:not([hidden]) {
      display: inline-block;
    }
  `
}

const inputBase = ({theme}: ThemeProps) => {
  const font = theme.sanity.fonts.text

  return css`
    -webkit-font-smoothing: antialiased;
    appearance: none;
    border: 0;
    font-family: ${font.family};
    color: inherit;
    width: 100%;
    outline: none;
    margin: 0;
  `
}

const inputColor = ({theme}: ThemeProps) => {
  const color = theme.sanity.color.input
  const {focusRing, input} = theme.sanity

  return css`
    background-color: ${color.default.enabled.bg};
    color: ${color.default.enabled.fg};
    box-shadow: ${borderStyle({
      color: color.default.enabled.border,
      width: input.border.width,
    })};

    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: ${color.default.hovered.bg};
        color: ${color.default.hovered.fg};
        box-shadow: ${borderStyle({
          color: color.default.hovered.border,
          width: input.border.width,
        })};
      }
    }

    &:not(:disabled):focus {
      box-shadow: ${focusRingStyle({
        border: {width: input.border.width, color: color.default.enabled.border},
        focusRing,
      })};
    }

    &:not(:disabled):focus:not(:focus-visible) {
      box-shadow: none;
    }

    &:disabled {
      opacity: 1;
      background-color: ${color.default.disabled.bg};
      color: ${color.default.disabled.fg};
      box-shadow: ${borderStyle({
        color: color.default.disabled.border,
        width: input.border.width,
      })};
    }
  `
}

const textSize = (size: ThemeFontSize) => {
  return {fontSize: rem(size.fontSize), lineHeight: rem(size.lineHeight)}
}

const inputTextSize = ({theme, fontSize}: {fontSize?: number | number[]} & ThemeProps) => {
  const {sizes} = theme.sanity.fonts.text

  return responsive(theme.sanity.media, getResponsiveProp(fontSize), (sizeIndex) =>
    textSize(sizes[sizeIndex] || sizes[2])
  )
}

const input = () => [
  responsiveRadiusStyle,
  inputBase,
  inputColor,
  inputTextSize,
  responsiveInputPaddingIconRightStyle,
]

const iconBox = ({theme}: {radius?: number | number[]; size?: number | number[]} & ThemeProps) => {
  const color = theme.sanity.color.input

  return css`
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;

    select:hover + & {
      color: ${color.default.hovered.fg};
    }

    select:disabled + & {
      color: ${color.default.disabled.fg};
    }
  `
}

export const select = {
  root,
  input,
  iconBox,
}
