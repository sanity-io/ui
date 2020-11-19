export interface ThemeColorInputState {
  bg: string
  fg: string
  border: string
  placeholder: string
}

export interface ThemeColorInput {
  tones: {
    default: {
      enabled: ThemeColorInputState
      disabled: ThemeColorInputState
      hovered: ThemeColorInputState
      invalid: ThemeColorInputState
    }
  }
}
