import {CSSObject} from 'styled-components'
import {ThemeColorSchemeKey} from '../../theme'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'

export interface TextInputInputStyleProps {
  scheme: ThemeColorSchemeKey
  uiSize?: number | number[]
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

export interface TextInputRepresentationStyleProps {
  border?: boolean
  scheme: ThemeColorSchemeKey
}

export const textInputStyle = {
  root: () => [rootStyle],
  input: () => [inputBaseStyle, inputFontSizeStyle],
  representation: representationStyle,
}

function rootStyle(): CSSObject {
  return {
    position: 'relative',

    '&&:not([hidden])': {
      display: 'block',
    },
  }
}

function inputBaseStyle(props: TextInputInputStyleProps & ThemeProps): CSSObject {
  const {scheme, theme, weight} = props
  const font = theme.fonts.text
  const _scheme = theme.color[scheme] || theme.color.light
  const tone = _scheme.input.tones.default

  return {
    appearance: 'none',
    background: 'none',
    border: 0,
    borderRadius: 0,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: font.family,
    fontWeight: (weight && font.weights[weight]) || font.weights.regular,
    margin: 0,
    position: 'relative',
    zIndex: 1,
    display: 'block',

    '&:is(textarea)': {
      resize: 'none',
    },

    // enabled
    '&:not(:invalid):not(:disabled)': {
      color: tone.enabled.fg,

      '&::placeholder': {
        color: tone.enabled.placeholder,
      },
    },

    // disabled
    '&:not(:invalid):disabled': {
      color: tone.disabled.fg,

      '&::placeholder': {
        color: tone.disabled.placeholder,
      },
    },

    // invalid
    '&:invalid': {
      color: tone.invalid.fg,

      '&::placeholder': {
        color: tone.invalid.placeholder,
      },
    },
  }
}

function inputFontSizeStyle(props: TextInputInputStyleProps & ThemeProps) {
  const {theme} = props

  return responsive(
    theme.media,
    getResponsiveProp(props.uiSize, [2]).map((sizeIndex) => {
      const size = theme.fonts.text.sizes[sizeIndex] || theme.fonts.text.sizes[2]

      return {
        fontSize: rem(size.fontSize),
        lineHeight: size.lineHeight / size.fontSize,
      }
    })
  )
}

function representationStyle(props: TextInputRepresentationStyleProps & ThemeProps): CSSObject {
  const {scheme, theme} = props
  const _scheme = theme.color[scheme] || theme.color.light
  const tone = _scheme.input.tones.default

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 0,

    // enabled
    color: tone.enabled.fg,
    backgroundColor: tone.enabled.bg,
    boxShadow: `0 0 0 1px ${tone.enabled.border}`,

    // focused
    '*:not(:disabled):focus + &': {
      boxShadow: '0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color)',
    },

    // invalid
    '*:not(:disabled):invalid + &': {
      color: tone.invalid.fg,
      backgroundColor: tone.invalid.bg,
      boxShadow: `0 0 0 1px ${tone.invalid.border}`,
    },

    // disabled
    '*:disabled + &': {
      color: tone.disabled.fg,
      backgroundColor: tone.disabled.bg,
      boxShadow: `0 0 0 1px ${tone.disabled.border}`,
    },

    // hovered
    '@media (hover: hover)': {
      '*:not(:disabled):not(:invalid):hover + &': {
        color: tone.hovered.fg,
        backgroundColor: tone.hovered.bg,
      },

      '*:not(:disabled):not(:invalid):not(:focus):hover + &': {
        boxShadow: `0 0 0 1px ${tone.hovered.border}`,
      },
    },
  }
}
