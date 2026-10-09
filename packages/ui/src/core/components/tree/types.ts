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
  /**
   * The item element that is the tree's tab stop (`tabindex="0"`): the registered item that was
   * focused last (or mounted as `selected`), as long as it is registered and not inside a collapsed
   * ancestor. `null` while the tree element itself is the tab stop.
   */
  focusedElement: HTMLElement | null
  level: number
  path: string[]
  registerItem: (element: HTMLElement, path: string, expanded: boolean, selected: boolean) => void
  setExpanded: (path: string, expanded: boolean) => void
  /**
   * Makes an item the tab stop. An element that is not a registered item element (the one passed
   * to `registerItem`) has no effect on the tab stop.
   */
  setFocusedElement: (focusedElement: HTMLElement | null) => void
  gap: number | number[]
  /**
   * @deprecated Use `gap` instead.
   */
  space?: never
  state: TreeState
}
