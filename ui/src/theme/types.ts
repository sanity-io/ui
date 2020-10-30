export type AvatarColorKey =
  | 'gray'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'

export type ColorSchemeKey = 'dark' | 'light'

export interface ThemeFontSize {
  ascenderHeight: number
  descenderHeight: number
  fontSize: number
  iconSize: number
  letterSpacing: number
  lineHeight: number
}

export interface ThemeFontWeight {
  [key: string]: number
}

export interface ThemeFont {
  family: string
  weights: ThemeFontWeight
  sizes: ThemeFontSize[]
}

export interface ThemeBadgeColorMode {
  bg: string
  fg: string
  border: string
}

export interface ThemeBadgeColor {
  modes: {
    default: ThemeBadgeColorMode
    outline: ThemeBadgeColorMode
  }
}

export interface ThemeButtonColorMode {
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
  hovered: {
    bg: string
    fg: string
    border: string
  }
  pressed: {
    bg: string
    fg: string
    border: string
  }
  selected: {
    bg: string
    fg: string
    border: string
  }
}

export interface ThemeButtonColor {
  modes: {
    default: ThemeButtonColorMode
    ghost: ThemeButtonColorMode
    bleed: ThemeButtonColorMode
  }
}

export interface ThemeCardStateColor {
  bg: string
  fg: string
  muted: {
    fg: string
  }
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

export interface ThemeCardToneColor {
  enabled: ThemeCardStateColor
  disabled: ThemeCardStateColor
  hovered: ThemeCardStateColor
  pressed: ThemeCardStateColor
  selected: ThemeCardStateColor
}

export interface ThemeCardColor {
  tones: {
    default: ThemeCardToneColor
    transparent: ThemeCardToneColor
  }
}

export interface ThemeSyntaxColor {
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

export interface ThemeColor {
  avatar: {
    gray: string
    blue: string
    cyan: string
    green: string
    yellow: string
    orange: string
    red: string
    magenta: string
    purple: string
  }

  badge: {
    tones: {
      default: ThemeBadgeColor
      brand: ThemeBadgeColor
      positive: ThemeBadgeColor
      caution: ThemeBadgeColor
      critical: ThemeBadgeColor
    }
  }

  button: {
    tones: {
      default: ThemeButtonColor
      brand: ThemeButtonColor
      positive: ThemeButtonColor
      caution: ThemeButtonColor
      critical: ThemeButtonColor
    }
  }

  card: ThemeCardColor

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
          placeholder: string
        }
        disabled: {
          bg: string
          fg: string
          border: string
          placeholder: string
        }
        hovered: {
          bg: string
          fg: string
          border: string
          placeholder: string
        }
      }
    }
  }
}

// offsetX, offsetY, blurRadius, spreadRadius
export type BoxShadow = [number, number, number, number]

export interface ThemeShadow {
  umbra: BoxShadow
  penumbra: [number, number, number, number]
  ambient: [number, number, number, number]
}

export interface ThemeFonts {
  code: ThemeFont
  heading: ThemeFont
  label: ThemeFont
  text: ThemeFont
}

export interface ThemeInput {
  checkbox: {
    size: number
  }
  radio: {
    size: number
    markSize: number
  }
  switch: {
    width: number
    height: number
    padding: number
    transitionDurationMs: number
    transitionTimingFunction: string
  }
}

export interface Theme {
  avatar: {
    distance: number[]
    size: number[]
  }
  color: {
    dark: ThemeColor
    light: ThemeColor
  }
  container: number[]
  fonts: ThemeFonts
  media: number[]
  radius: number[]
  shadows: Array<ThemeShadow | null>
  space: number[]
  input: ThemeInput
}
