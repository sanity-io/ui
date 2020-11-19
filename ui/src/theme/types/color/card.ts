export interface ThemeCardStateColor {
  bg: string
  fg: string
  muted: {
    fg: string
  }
  accent: {
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

export interface ThemeColorCard {
  tones: {
    default: ThemeCardToneColor
    transparent: ThemeCardToneColor
    positive: ThemeCardToneColor
    caution: ThemeCardToneColor
    critical: ThemeCardToneColor
    brand: ThemeCardToneColor
  }
}
