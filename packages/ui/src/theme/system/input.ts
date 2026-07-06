import {ThemeFocusRing} from './focusRing'

/**
 * @public
 */
export interface ThemeInput_v2 {
  checkbox: {
    size: number
    focusRing: ThemeFocusRing
  }
  radio: {
    size: number
    markSize: number
    focusRing: ThemeFocusRing
  }
  switch: {
    width: number
    height: number
    padding: number
    transitionDurationMs: number
    transitionTimingFunction: string
    focusRing: ThemeFocusRing
  }
  border: {
    width: number
  }
  select: {
    focusRing: ThemeFocusRing
  }
  text: {
    focusRing: ThemeFocusRing
  }
}
