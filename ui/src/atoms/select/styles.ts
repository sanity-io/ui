import {css} from 'styled-components'
import {
  getResponsiveProp,
  rem,
  responsive,
  responsiveInputPaddingIconRightStyle,
  responsiveRadiusStyle,
  ThemeProps,
} from '../../styles'
import {ThemeFontSize} from '../../theme'

const root = () => {
  return css`
    position: relative;
    width: stretch;

    &&:not([hidden]) {
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
  `
}

const inputColor = ({theme}: ThemeProps) => {
  const color = theme.sanity.color.input

  return css`
    background-color: ${color.default.enabled.bg};
    color: ${color.default.enabled.fg};
    box-shadow: inset 0 0 0 1px ${color.default.enabled.border};

    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: ${color.default.hovered.bg};
        color: ${color.default.hovered.fg};
        box-shadow: inset 0 0 0 1px ${color.default.hovered.border};
      }
    }

    &:not(:disabled):focus {
      box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
    }

    &:not(:disabled):focus:not(:focus-visible) {
      box-shadow: none;
    }

    &:disabled {
      opacity: 1;
      background-color: ${color.default.disabled.bg};
      color: ${color.default.disabled.fg};
      box-shadow: inset 0 0 0 1px ${color.default.disabled.border};
    }
  `
}

const textSize = (size: ThemeFontSize) => {
  return {fontSize: rem(size.fontSize), lineHeight: rem(size.lineHeight)}
}

const inputTextSize = ({theme, uiSize}: {uiSize?: number | number[]} & ThemeProps) => {
  const {sizes} = theme.sanity.fonts.text

  return responsive(theme.sanity.media, getResponsiveProp(uiSize), (sizeIndex) =>
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

const iconBox = ({
  theme,
}: {radius?: number | number[]; uiSize?: number | number[]} & ThemeProps) => {
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
