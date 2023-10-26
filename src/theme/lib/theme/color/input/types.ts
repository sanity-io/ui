/**
 * @public
 */
export interface ThemeColorInputState {
  bg: string
  bg2: string
  fg: string
  border: string
  placeholder: string
}

/**
 * @public
 */
export interface ThemeColorInputStates {
  enabled: ThemeColorInputState
  disabled: ThemeColorInputState
  hovered: ThemeColorInputState
  readOnly: ThemeColorInputState
}

/**
 * @public
 */
export interface ThemeColorInput {
  default: ThemeColorInputStates
  invalid: ThemeColorInputStates
}
