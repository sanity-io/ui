import {CSSObject} from 'styled-components'
import {ThemeColorSchemeKey, ThemeColorInputState} from '../../theme'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'

interface TextInputRootStyleProps {
  disabled?: boolean
  scheme: ThemeColorSchemeKey
}

interface TextInputInputStyleProps {
  uiSize?: number | number[]
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

export const textInputStyle = {
  root: [
    {
      position: 'relative',

      '&&:not([hidden])': {
        display: 'block',
      },
    } as CSSObject,
    rootColorStyle,
  ],
  input: [inputBaseStyle, inputFontSizeStyle],
}

function _textInputColor(color: ThemeColorInputState): CSSObject {
  return {
    '&>input,&>textarea': {
      color: color.fg,

      '&::placeholder': {
        color: color.placeholder,
      },
    },
  }
}

function rootColorStyle({disabled, scheme, theme}: TextInputRootStyleProps & ThemeProps) {
  const _scheme = theme.color[scheme] || theme.color.light
  const tone = _scheme.input.tones.default

  if (disabled) {
    return _textInputColor(tone.disabled)
  }

  return [
    _textInputColor(tone.enabled),
    {
      '@media(hover:hover)': {
        '&:hover': _textInputColor(tone.hovered),
      },

      '&:focus-within': {
        boxShadow: '0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color)',
      },
    } as CSSObject,
  ]
}

function inputBaseStyle(props: TextInputInputStyleProps & ThemeProps): CSSObject {
  const {theme, weight} = props
  const font = theme.fonts.text

  return {
    appearance: 'none',
    color: 'inherit',
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

    '&&:not[hidden]': {
      display: 'block',
    },

    '&:is(textarea)': {
      resize: 'none',
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
