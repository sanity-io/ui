import {CSSObject} from 'styled-components'
import {ThemeFontWeightKey} from '../../theme'
import {focusRingBorderStyle, focusRingStyle} from '../focusRing'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'

export interface TextInputInputStyleProps {
  $fontSize?: number | number[]
  $weight?: ThemeFontWeightKey
}

export interface TextInputRepresentationStyleProps {
  $border?: boolean
  $hasPrefix?: boolean
  $hasSuffix?: boolean
}

export const textInputStyle = {
  root: () => [rootStyle],
  input: () => [inputBaseStyle, inputFontSizeStyle],
  representation: [representationStyle],
}

function rootStyle(): CSSObject {
  return {
    '&:not([hidden])': {
      display: 'flex',
    },
  }
}

function inputBaseStyle(props: TextInputInputStyleProps & ThemeProps): CSSObject {
  const {theme, $weight} = props
  const font = theme.sanity.fonts.text
  const color = theme.sanity.color.input

  return {
    appearance: 'none',
    background: 'none',
    border: 0,
    borderRadius: 0,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: font.family,
    fontWeight: ($weight && font.weights[$weight]) || font.weights.regular,
    margin: 0,
    position: 'relative',
    zIndex: 1,
    display: 'block',

    // &:is(textarea)
    '&[data-as="textarea"]': {
      resize: 'none',
    },

    // enabled
    '&:not(:invalid):not(:disabled)': {
      color: color.default.enabled.fg,

      '&::placeholder': {
        color: color.default.enabled.placeholder,
      },
    },

    // disabled
    '&:not(:invalid):disabled': {
      color: color.default.disabled.fg,

      '&::placeholder': {
        color: color.default.disabled.placeholder,
      },
    },

    // invalid
    '&:invalid': {
      color: color.invalid.enabled.fg,

      '&::placeholder': {
        color: color.invalid.enabled.placeholder,
      },
    },
  }
}

function inputFontSizeStyle(props: TextInputInputStyleProps & ThemeProps) {
  const {theme} = props
  const {fonts, media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$fontSize, [2]), (sizeIndex) => {
    const size = fonts.text.sizes[sizeIndex] || fonts.text.sizes[2]

    return {
      fontSize: rem(size.fontSize),
      lineHeight: size.lineHeight / size.fontSize,
    }
  })
}

function representationStyle(props: TextInputRepresentationStyleProps & ThemeProps): CSSObject {
  const {$border, $hasPrefix, $hasSuffix, theme} = props
  const {focusRing, input} = theme.sanity
  const color = theme.sanity.color.input

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'block',
    pointerEvents: 'none',
    zIndex: 0,

    // enabled
    '*:not(:disabled) + &': {
      color: color.default.enabled.fg,
      backgroundColor: color.default.enabled.bg,
      boxShadow: $border
        ? focusRingBorderStyle({color: color.default.enabled.border, width: input.border.width})
        : undefined,
    },

    // invalid
    '*:not(:disabled):invalid + &': {
      color: color.invalid.enabled.fg,
      backgroundColor: color.invalid.enabled.bg,
      boxShadow: $border
        ? focusRingBorderStyle({color: color.invalid.enabled.border, width: input.border.width})
        : 'none',
    },

    // focused
    '*:not(:disabled):focus + &': {
      boxShadow: focusRingStyle({
        border: $border
          ? {color: color.default.enabled.border, width: input.border.width}
          : undefined,
        focusRing,
      }),
    },

    // disabled
    '*:disabled + &': {
      color: color.default.disabled.fg,
      backgroundColor: color.default.disabled.bg,
      boxShadow: $border
        ? focusRingBorderStyle({
            color: color.default.disabled.border,
            width: input.border.width,
          })
        : 'none',
    },

    // hovered
    '@media (hover: hover)': {
      '*:not(:disabled):not(:invalid):hover + &': {
        color: color.default.hovered.fg,
        backgroundColor: color.default.hovered.bg,
      },

      '*:not(:disabled):not(:invalid):not(:focus):hover + &': {
        boxShadow: $border
          ? focusRingBorderStyle({
              color: color.default.hovered.border,
              width: input.border.width,
            })
          : 'none',
      },
    },

    borderTopLeftRadius: $hasPrefix ? 0 : undefined,
    borderBottomLeftRadius: $hasPrefix ? 0 : undefined,
    borderTopRightRadius: $hasSuffix ? 0 : undefined,
    borderBottomRightRadius: $hasSuffix ? 0 : undefined,
  }
}
