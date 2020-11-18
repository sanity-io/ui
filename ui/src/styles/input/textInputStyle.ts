import {CSSObject} from 'styled-components'
import {ColorSchemeKey, ThemeInputStateColor} from '../../theme'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'

interface TextInputRootStyleProps {
  border?: boolean
  disabled?: boolean
  scheme: ColorSchemeKey
}

interface TextInputInputStyleProps {
  uiSize?: number | number[]
  weight?: string
}

export const textInputStyle = {
  root: [{display: 'block', position: 'relative'} as CSSObject, rootColorStyle],
  input: [inputBaseStyle, inputFontSizeStyle],
}

function _textInputColor(color: ThemeInputStateColor, border?: boolean): CSSObject {
  return {
    backgroundColor: color.bg,
    boxShadow: border ? `inset 0 0 0 1px ${color.border}` : undefined,

    '&>input,&>textarea': {
      color: color.fg,

      '&::placeholder': {
        color: color.placeholder,
      },
    },
  }
}

function rootColorStyle({border, disabled, scheme, theme}: TextInputRootStyleProps & ThemeProps) {
  const _scheme = theme.color[scheme] || theme.color.light
  const tone = _scheme.input.tones.default

  if (disabled) {
    return _textInputColor(tone.disabled, border)
  }

  return [
    _textInputColor(tone.enabled, border),
    {
      '@media(hover:hover)': {
        '&:hover': _textInputColor(tone.hovered, border),
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
    display: 'block',
    appearance: 'none',
    color: 'inherit',
    background: 'none',
    border: 0,
    borderRadius: 0,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: font.family,
    fontWeight: font.weights[weight || 'regular'],
    margin: 0,

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
