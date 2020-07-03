interface ThemeFontSize {
  ascenderHeight: number
  descenderHeight: number
  fontSize: number
  letterSpacing: number
  lineHeight: number
}

interface ThemeFontWeight {
  [key: string]: number
}

interface ThemeFont {
  family: string
  weights: ThemeFontWeight
  sizes: ThemeFontSize[]
}

interface ThemeButtonColor {
  modes: {
    default: {
      enabled: {
        bg: string
        fg: string
        border: string
      }
      hovered: {
        bg: string
        fg: string
        border: string
      }
    }
    ghost: {
      enabled: {
        bg: string
        fg: string
        border: string
      }
      hovered: {
        bg: string
        fg: string
        border: string
      }
    }
    bleed: {
      enabled: {
        bg: string
        fg: string
        border: string
      }
      hovered: {
        bg: string
        fg: string
        border: string
      }
    }
  }
}

interface ThemeCardColor {
  bg: string
  fg: string
  hairline: {
    soft: string
    hard: string
  }
  focusRing: string
  link: string
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    // antumbra: string
    ambient: string
  }
}

interface ThemeColor {
  button: {
    tones: {
      default: ThemeButtonColor
      brand: ThemeButtonColor
      positive: ThemeButtonColor
      caution: ThemeButtonColor
      critical: ThemeButtonColor
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

// offsetX, offsetY, blurRadius, spreadRadius
type BoxShadow = [number, number, number, number]

interface ThemeShadow {
  umbra: BoxShadow
  penumbra: [number, number, number, number]
  ambient: [number, number, number, number]
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
  shadows: Array<ThemeShadow | null>
  space: number[]
}
