/**
 * @beta
 */
export interface TabContextListValue {
  version: 0.0
  focusedId: string | undefined
  activeId: string | undefined
  focusTab: (id: string | undefined) => void
  activateTab: (id: string) => void
  registerTab: (id: string, element: HTMLElement, selected: boolean | undefined) => () => void
}
