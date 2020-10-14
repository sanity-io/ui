import {Theme, ThemeFontSize} from '../../theme'
import {rem, responsive} from '../helpers'

type FontKey = 'code' | 'heading' | 'label' | 'text'

interface FontProps {
  uiSize?: number[]
  theme: Theme
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

export function font(fontKey: FontKey, props: FontProps) {
  const {uiSize = [], theme} = props
  const {family: fontFamily, weights} = theme.fonts[fontKey]
  const fontWeight = weights[props.weight || 'regular']

  const ret = [
    {
      position: 'relative',
      fontFamily,
      fontWeight,
      display: 'block',
      padding: '1px 0',
      margin: 0,
    },
    responsive(
      theme,
      uiSize.map((sizeIndex) => fontSize(theme.fonts.text.sizes[sizeIndex]))
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
  const capHeight = size.lineHeight - size.ascenderHeight - size.descenderHeight

  return {
    fontSize: rem(size.fontSize),
    lineHeight: rem(size.lineHeight),
    letterSpacing: rem(size.letterSpacing),
    transform: `translateY(${rem(size.descenderHeight)})`,
    // margin: '0 -0.06em',

    '&:before': {
      marginTop: rem(0 - size.ascenderHeight - size.descenderHeight - 1),
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
