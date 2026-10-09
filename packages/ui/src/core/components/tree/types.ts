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
   * The registered item element (the one passed to `registerItem`) that corresponds to the tree's
   * tab stop: the item that was focused last (or mounted as `selected`), as long as it is
   * registered and not inside a collapsed ancestor. For an item with an `href` the `tabindex="0"`
   * sits on its link, not on this element. `null` while the tree element itself is the tab stop.
   */
  focusedElement: HTMLElement | null
  level: number
  path: string[]
  registerItem: (element: HTMLElement, path: string, expanded: boolean, selected: boolean) => void
  setExpanded: (path: string, expanded: boolean) => void
  /**
   * Makes an item the tab stop. `null`, or an element that is not a registered item element (the
   * one passed to `registerItem`), hands the tab stop back to the tree element.
   */
  setFocusedElement: (focusedElement: HTMLElement | null) => void
  gap: number | number[]
  /**
   * @deprecated Use `gap` instead.
   */
  space?: never
  state: TreeState
}
