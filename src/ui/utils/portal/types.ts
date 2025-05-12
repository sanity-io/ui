/**
 * @public
 */
export interface PortalContextValue {
  version: 0.0
  boundaryElement: HTMLElement | null
  element: HTMLElement | null
  elements?: Record<string, HTMLElement | null | undefined>
}
