import {css} from 'styled-components'
import {rem, _responsive, ThemeProps} from '../../styles'
import {
  focusRingBorderStyle,
  focusRingStyle,
  responsiveInputPaddingIconRightStyle,
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
} from '../../styles/internal'
import {ThemeFontSize} from '../../theme'
import {mutableCardVariables} from '../../theme/lib/theme/color/cssVariables/cardVariables'
import {cssVars} from '../../theme/lib/theme/color/cssVariables/createCssVars'
import {CSSObject} from '../../types/styled'

function rootStyle(): ReturnType<typeof css> {
  return css`
    position: relative;
    width: stretch;

    &:not([hidden]) {
      display: inline-block;
    }
  `
}

function inputBaseStyle(props: ThemeProps): ReturnType<typeof css> {
  const {theme} = props
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

    &:disabled {
      opacity: 1;
    }
  `
}

function inputColorStyle(props: ThemeProps) {
  const {theme} = props
  const {input} = theme.sanity
  const {focusRing} = input.select

  return css`
    /* enabled */
    background-color: ${cssVars.default['bg-base']};
    color: ${cssVars.default['text-primary']};
    box-shadow: ${focusRingBorderStyle({
      color: cssVars.default['border-base'],
      width: input.border.width,
    })};

    /* hovered */
    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: ${cssVars.default['bg-base-hover']};
        color: ${cssVars.default['text-primary']};
        box-shadow: ${focusRingBorderStyle({
          color: cssVars.default['border-base-hover'],
          width: input.border.width,
        })};
      }
    }

    /* focused */
    &:not(:disabled):focus {
      box-shadow: ${focusRingStyle({
        border: {width: input.border.width, color: cssVars.default['border-base']},
        focusRing,
      })};
    }

    /* read-only */
    &[data-read-only] {
      background-color: ${cssVars.default['bg-tint']};
      color: ${cssVars.default['text-primary']};
      box-shadow: ${focusRingBorderStyle({
        color: cssVars.default['border-base'],
        width: input.border.width,
      })};
    }

    /* disabled */
    &:not([data-read-only]):disabled {
      background-color: ${cssVars.default['bg-tint']};
      color: ${cssVars.default['text-primary']};
      box-shadow: ${focusRingBorderStyle({
        color: cssVars.default['border-base'],
        width: input.border.width,
      })};
    }
  `
}

function textSize(size: ThemeFontSize) {
  return {fontSize: rem(size.fontSize), lineHeight: rem(size.lineHeight)}
}

function inputTextSizeStyle(props: {$fontSize: number[]} & ThemeProps) {
  const {theme, $fontSize} = props
  const {sizes} = theme.sanity.fonts.text

  return _responsive(theme.sanity.media, $fontSize, (sizeIndex) =>
    textSize(sizes[sizeIndex] || sizes[2]),
  )
}

function inputStyle(): Array<
  | ((
      props: ResponsiveRadiusStyleProps & {
        $fontSize: number[]
        $padding: number[]
        $space: number[]
      } & ThemeProps,
    ) => CSSObject[])
  | ((props: ThemeProps) => ReturnType<typeof css>)
> {
  return [
    responsiveRadiusStyle,
    inputBaseStyle,
    inputColorStyle,
    inputTextSizeStyle,
    responsiveInputPaddingIconRightStyle,
  ]
}

function iconBoxStyle(): ReturnType<typeof css> {
  return css`
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;

    /* enabled */
    ${mutableCardVariables['fg-color']}: ${cssVars.default['text-primary']};

    /* hover */
    @media (hover: hover) {
      select:not(disabled):not(:read-only):hover + && {
        ${mutableCardVariables['fg-color']}: ${cssVars.default['text-primary']};
      }
    }

    /* disabled */
    select:disabled + && {
      ${mutableCardVariables['fg-color']}: ${cssVars.default['text-primary']};
    }

    /* read-only */
    select[data-read-only] + && {
      ${mutableCardVariables['fg-color']}: ${cssVars.default['text-primary']};
    }
  `
}

export const selectStyle = {
  root: rootStyle,
  input: inputStyle,
  iconBox: iconBoxStyle,
}
