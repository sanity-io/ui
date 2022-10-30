import {CSSObject} from 'styled-components'
import {rem, _responsive, ThemeProps} from '../../styles'
import {
  focusRingBorderStyle,
  focusRingStyle,
  responsiveInputPaddingIconRightStyle,
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
} from '../../styles/internal'
import {ThemeFontSize} from '../../theme'

function rootStyle(): CSSObject {
  return {
    position: 'relative',
    width: 'stretch',

    '&:not([hidden])': {
      display: 'inline-block',
    },
  }
}

function inputBaseStyle(props: ThemeProps): CSSObject {
  const {theme} = props
  const font = theme.sanity.fonts.text

  return {
    WebkitFontSmoothing: 'antialiased',
    appearance: 'none',
    border: 0,
    fontFamily: font.family,
    color: 'inherit',
    width: '100%',
    outline: 'none',
    margin: 0,

    '&:disabled': {
      opacity: 1,
    },
  }
}

function inputColorStyle(props: ThemeProps): CSSObject {
  const {theme} = props
  const {focusRing, input} = theme.sanity
  const color = theme.sanity.color.input

  return {
    /* enabled */
    backgroundColor: color.default.enabled.bg,
    color: color.default.enabled.fg,
    boxShadow: focusRingBorderStyle({
      color: color.default.enabled.border,
      width: input.border.width,
    }),

    /* hovered */
    '@media (hover: hover)': {
      '&:not(:disabled):hover': {
        backgroundColor: color.default.hovered.bg,
        color: color.default.hovered.fg,
        boxShadow: focusRingBorderStyle({
          color: color.default.hovered.border,
          width: input.border.width,
        }),
      },
    },

    /* focused */
    '&:not(:disabled):focus': {
      boxShadow: focusRingStyle({
        border: {width: input.border.width, color: color.default.enabled.border},
        focusRing,
      }),
    },

    /* read-only */
    '&[data-read-only]': {
      backgroundColor: color.default.readOnly.bg,
      color: color.default.readOnly.fg,
      boxShadow: focusRingBorderStyle({
        color: color.default.readOnly.border,
        width: input.border.width,
      }),
    },

    /* disabled */
    '&:not([data-read-only]):disabled': {
      backgroundColor: color.default.disabled.bg,
      color: color.default.disabled.fg,
      boxShadow: focusRingBorderStyle({
        color: color.default.disabled.border,
        width: input.border.width,
      }),
    },
  }
}

function textSize(size: ThemeFontSize): CSSObject {
  return {fontSize: rem(size.fontSize), lineHeight: rem(size.lineHeight)}
}

function inputTextSizeStyle(props: {$fontSize: number[]} & ThemeProps): CSSObject[] {
  const {theme, $fontSize} = props
  const {sizes} = theme.sanity.fonts.text

  return _responsive(theme.sanity.media, $fontSize, (sizeIndex) =>
    textSize(sizes[sizeIndex] || sizes[2])
  )
}

function inputStyle(): Array<
  | ((
      props: ResponsiveRadiusStyleProps & {
        $fontSize: number[]
        $padding: number[]
        $space: number[]
      } & ThemeProps
    ) => CSSObject[])
  | ((props: ThemeProps) => CSSObject)
> {
  return [
    responsiveRadiusStyle,
    inputBaseStyle,
    inputColorStyle,
    inputTextSizeStyle,
    responsiveInputPaddingIconRightStyle,
  ]
}

function iconBoxStyle(props: ThemeProps): CSSObject {
  const {theme} = props
  const color = theme.sanity.color.input

  return {
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    right: 0,

    /* enabled */
    '--card-fg-color': color.default.enabled.fg,

    /* hover */
    '@media (hover: hover)': {
      'select:not(disabled):not(:read-only):hover + &&': {
        '--card-fg-color': color.default.hovered.fg,
      },
    },

    /* disabled */
    'select:disabled + &&': {
      '--card-fg-color': color.default.disabled.fg,
    },

    /* read-only */
    'select[data-read-only] + &&': {
      '--card-fg-color': color.default.readOnly.fg,
    },
  }
}

export const selectStyle = {
  root: rootStyle,
  input: inputStyle,
  iconBox: iconBoxStyle,
}
