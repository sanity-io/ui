interface ThemeFontSize {
  ascenderHeight: number
  descenderHeight: number
  fontSize: number
  iconSize: number
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

interface ThemeSyntaxColor {
  atrule: string
  attrName: string
  attrValue: string
  attribute: string
  boolean: string
  builtin: string
  cdata: string
  char: string
  class: string
  className: string
  comment: string
  constant: string
  deleted: string
  doctype: string
  entity: string
  function: string
  hexcode: string
  id: string
  important: string
  inserted: string
  keyword: string
  number: string
  operator: string
  prolog: string
  property: string
  pseudoClass: string
  pseudoElement: string
  punctuation: string
  regex: string
  selector: string
  string: string
  symbol: string
  tag: string
  unit: string
  url: string
  variable: string
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

  syntax: {
    tones: {
      default: ThemeSyntaxColor
    }
  }

  switch: {
    tones: {
      default: {
        enabled: {
          thumb: string
          off: {
            bg: string
          }
          on: {
            bg: string
          }
        }
        disabled: {
          thumb: string
          off: {
            bg: string
          }
          on: {
            bg: string
          }
        }
      }
    }
  }

  input: {
    tones: {
      default: {
        enabled: {
          bg: string
          fg: string
          border: string
        }
        disabled: {
          bg: string
          fg: string
          border: string
        }
      }
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
  input: {
    checkbox: {
      size: number
    }
    radio: {
      size: number
    }
    switch: {
      width: number
      height: number
      padding: number
      transitionDurationMs: number
      transitionTimingFunction: string
    }
  }
}
