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

interface ThemeButtonColor {
  enabled: {
    bg: string
    fg: string
  }
  hovered: {
    bg: string
    fg: string
  }
}

interface ThemeCardColor {
  bg: string
  fg: string
}

interface ThemeColor {
  button: {
    tones: {
      default: ThemeButtonColor
      brand: ThemeButtonColor
    }
  }

  card: {
    tones: {
      default: ThemeCardColor
      transparent: ThemeCardColor
      contrast: ThemeCardColor
    }
  }
}

export interface Theme {
  color: ThemeColor
  container: number[]
  fonts: {
    code: ThemeFont
    heading: ThemeFont
    label: ThemeFont
    text: ThemeFont
  }
  media: number[]
  radius: number[]
  space: number[]
}
