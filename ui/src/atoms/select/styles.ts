import {css} from 'styled-components'
import {
  getResponsiveProp,
  rem,
  responsive,
  responsiveInputPaddingIconRightStyle,
  responsiveRadiusStyle,
} from '../../styles'
import {ThemeColorSchemeKey, Theme, ThemeFontSize} from '../../theme'

const root = () => {
  return css`
    position: relative;
    &&:not([hidden]) {
      display: inline-block;
    }
  `
}

const inputBase = ({theme}: {theme: Theme}) => {
  const font = theme.fonts.text

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

const inputColor = ({scheme, theme}: {scheme: ThemeColorSchemeKey; theme: Theme}) => {
  const _scheme = theme.color[scheme] || theme.color.light
  const tone = _scheme.input.tones.default

  return css`
    background-color: ${tone.enabled.bg};
    color: ${tone.enabled.fg};
    box-shadow: inset 0 0 0 1px ${tone.enabled.border};

    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: ${tone.hovered.bg};
        color: ${tone.hovered.fg};
        box-shadow: inset 0 0 0 1px ${tone.hovered.border};
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
      background-color: ${tone.disabled.bg};
      color: ${tone.disabled.fg};
      box-shadow: inset 0 0 0 1px ${tone.disabled.border};
    }
  `
}

const textSize = (size: ThemeFontSize) => {
  return {
    fontSize: rem(size.fontSize),
    lineHeight: rem(size.lineHeight),
  }
}

const inputTextSize = ({theme, uiSize}: {theme: Theme; uiSize?: number | number[]}) => {
  const {sizes} = theme.fonts.text

  return responsive(
    theme.media,
    getResponsiveProp(uiSize).map((sizeIndex) => textSize(sizes[sizeIndex] || sizes[2]))
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
  scheme,
  theme,
}: {
  radius?: number | number[]
  scheme: ThemeColorSchemeKey
  uiSize?: number | number[]
  theme: Theme
}) => {
  const _scheme = theme.color[scheme] || theme.color.light
  const tone = _scheme.input.tones.default

  return css`
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;

    select:hover + & {
      color: ${tone.hovered.fg};
    }

    select:disabled + & {
      color: ${tone.disabled.fg};
    }
  `
}

export const select = {
  root,
  input,
  iconBox,
}
