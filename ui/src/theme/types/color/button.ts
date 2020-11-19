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

export interface ThemeColorButtonTone {
  modes: {
    default: ThemeButtonColorMode
    ghost: ThemeButtonColorMode
    bleed: ThemeButtonColorMode
  }
}

export interface ThemeColorButton {
  tones: {
    default: ThemeColorButtonTone
    brand: ThemeColorButtonTone
    positive: ThemeColorButtonTone
    caution: ThemeColorButtonTone
    critical: ThemeColorButtonTone
  }
}
