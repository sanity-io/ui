import {ThemeFontSize} from '@sanity/ui/theme'
import {CSSObject} from '@sanity/ui/theme'
import {css} from 'styled-components'
import {rem, _responsive, ThemeProps} from '../../styles'
import {
  focusRingBorderStyle,
  focusRingStyle,
  responsiveInputPaddingIconRightStyle,
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
} from '../../styles/internal'

function rootStyle(): ReturnType<typeof css> {
  return css`
    position: relative;
    width: -moz-available;
    width: -webkit-fill-available;
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
  const color = theme.sanity.color.input

  return css`
    /* enabled */
    background-color: ${color.default.enabled.bg};
    color: ${color.default.enabled.fg};
    box-shadow: ${focusRingBorderStyle({
      color: color.default.enabled.border,
      width: input.border.width,
    })};

    /* hovered */
    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: ${color.default.hovered.bg};
        color: ${color.default.hovered.fg};
        box-shadow: ${focusRingBorderStyle({
          color: color.default.hovered.border,
          width: input.border.width,
        })};
      }
    }

    /* focused */
    &:not(:disabled):focus {
      box-shadow: ${focusRingStyle({
        border: {width: input.border.width, color: color.default.enabled.border},
        focusRing,
      })};
    }

    /* read-only */
    &[data-read-only] {
      background-color: ${color.default.readOnly.bg};
      color: ${color.default.readOnly.fg};
      box-shadow: ${focusRingBorderStyle({
        color: color.default.readOnly.border,
        width: input.border.width,
      })};
    }

    /* disabled */
    &:not([data-read-only]):disabled {
      background-color: ${color.default.disabled.bg};
      color: ${color.default.disabled.fg};
      box-shadow: ${focusRingBorderStyle({
        color: color.default.disabled.border,
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

function iconBoxStyle(props: ThemeProps): ReturnType<typeof css> {
  const {theme} = props
  const color = theme.sanity.color.input

  return css`
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;

    /* enabled */
    --card-fg-color: ${color.default.enabled.fg};

    /* hover */
    @media (hover: hover) {
      select:not(disabled):not(:read-only):hover + && {
        --card-fg-color: ${color.default.hovered.fg};
      }
    }

    /* disabled */
    select:disabled + && {
      --card-fg-color: ${color.default.disabled.fg};
    }

    /* read-only */
    select[data-read-only] + && {
      --card-fg-color: ${color.default.readOnly.fg};
    }
  `
}

export const selectStyle = {
  root: rootStyle,
  input: inputStyle,
  iconBox: iconBoxStyle,
}
