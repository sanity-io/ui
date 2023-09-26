import {FocusRing} from '../../types'

/**
 * @public
 */
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
  border: {
    width: number
  }
  focusRing: FocusRing
}
