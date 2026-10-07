import type {PortalContextValue} from './types'

/**
 * The element a `Portal` renders into: the named element when `name` is given, otherwise the
 * context's element, falling back to the `default` named element in both cases.
 *
 * Components that reason about the portal element (the tooltip caps its width to it, the dialog
 * scopes its click-outside and focus handling to it) resolve it through this function as well, so
 * they cannot disagree with where the portal content ends up.
 */
export function resolvePortalElement(
  portal: PortalContextValue,
  name?: string,
): HTMLElement | null {
  return (name ? portal.elements?.[name] : portal.element) || portal.elements?.default || null
}
