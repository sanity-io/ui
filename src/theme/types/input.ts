import {FocusRing} from '../types'

/**
 * @public
 */
export interface ThemeInput {
  checkbox: {
    size: number
    focusRing: FocusRing
  }
  radio: {
    size: number
    markSize: number
    focusRing: FocusRing
  }
  switch: {
    width: number
    height: number
    padding: number
    transitionDurationMs: number
    transitionTimingFunction: string
    focusRing: FocusRing
  }
  border: {
    width: number
  }
  select: {
    focusRing: FocusRing
  }
  text: {
    focusRing: FocusRing
  }
}
