import {type ReactNode} from 'react'
import {createPortal} from 'react-dom'

export function renderPortal(node: ReactNode, mounted: boolean, portal?: boolean) {
  if (!portal) {
    return node
  }

  if (!mounted) {
    return null
  }

  return createPortal(node, document.body)
}
