import {ThemeFontSize} from '../../theme'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'

export type FontKey = 'code' | 'heading' | 'label' | 'text'
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold'

export interface FontProps extends ThemeProps {
  size?: number | number[]
  weight?: FontWeight
}

export function font(fontKey: FontKey, props: FontProps) {
  const {size, theme} = props
  const {family, sizes, weights} = theme.fonts[fontKey]
  const fontWeight = weights[props.weight || 'regular']

  const ret = [
    {
      position: 'relative',
      fontFamily: family,
      fontWeight,
      display: 'block',
      padding: '1px 0',
      margin: 0,
    },
    ...responsive(
      theme,
      getResponsiveProp(size).map((sizeIndex) => fontSize(sizes[sizeIndex]))
    ),
  ]

  return ret
}

export function codeFont(props: FontProps) {
  return font('code', props)
}

export function headingFont(props: FontProps) {
  return font('heading', props)
}

export function textFont(props: FontProps) {
  return font('text', props)
}

export function labelFont(props: FontProps) {
  return font('label', props)
}

export function fontSize(size: ThemeFontSize) {
  const negHeight = size.ascenderHeight + size.descenderHeight
  const capHeight = size.lineHeight - negHeight

  return {
    fontSize: rem(size.fontSize),
    lineHeight: rem(size.lineHeight),
    letterSpacing: rem(size.letterSpacing),
    transform: `translateY(${rem(size.descenderHeight)})`,

    '&:before': {
      marginTop: `calc(${rem(0 - negHeight)} - 1px)`,
    },

    '&:after': {
      marginBottom: '-1px',
    },

    '& > svg': {
      fontSize: rem(size.iconSize),
      margin: rem((capHeight - size.iconSize) / 2),
    },
  }
}
