import {containsOrEqualsElement} from '../../helpers'

export function isTargetWithinScope(
  boundaryElement: HTMLElement | null,
  portalElement: HTMLElement | null,
  target: Node,
): boolean {
  if (!boundaryElement || !portalElement) return true

  return (
    containsOrEqualsElement(boundaryElement, target) ||
    containsOrEqualsElement(portalElement, target)
  )
}
