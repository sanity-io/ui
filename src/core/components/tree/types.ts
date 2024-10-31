import type {ResponsiveProp} from '@sanity/ui/css'
import type {Space} from '@sanity/ui/theme'

/**
 * @beta
 */
export interface TreeState {
  [key: string]: {element: HTMLElement; expanded: boolean} | undefined
}

/**
 * @beta
 */
export interface TreeContextValue {
  version: 0.0
  focusedElement: HTMLElement | null
  level: number
  path: string[]
  registerItem: (element: HTMLElement, path: string, expanded: boolean, selected: boolean) => void
  setExpanded: (path: string, expanded: boolean) => void
  setFocusedElement: (focusedElement: HTMLElement | null) => void
  // space: number | number[]
  space: ResponsiveProp<Space>
  state: TreeState
}
