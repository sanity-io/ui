import {type ReactNode} from 'react'
import {createPortal} from 'react-dom'

export function renderPortal(
  node: ReactNode,
  mounted: boolean,
  portal?: boolean,
  portalElement?: Element | DocumentFragment,
) {
  if (!portal) {
    return node
  }

  if (!mounted) {
    return null
  }

  return createPortal(node, portalElement || document.body)
}
