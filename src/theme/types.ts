interface ThemeFontSize {
  ascenderHeight: number
  descenderHeight: number
  fontSize: number
  letterSpacing: number
  lineHeight: number
}

interface ThemeFont {
  family: string
  sizes: ThemeFontSize[]
}

interface ThemeColor {
  button: {
    tones: {
      default: {
        enabled: {
          bg: string
          fg: string
        }
        hovered: {
          bg: string
          fg: string
        }
      }
      brand: {
        enabled: {
          bg: string
          fg: string
        }
        hovered: {
          bg: string
          fg: string
        }
      }
    }
  }
}

export interface Theme {
  color: ThemeColor
  fonts: {
    code: ThemeFont
    heading: ThemeFont
    label: ThemeFont
    text: ThemeFont
  }
  media: number[]
  space: number[]
}
