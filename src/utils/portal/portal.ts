import React from 'react'
import ReactDOM from 'react-dom'
import {usePortal} from './usePortal'

/**
 * @public
 */
export interface PortalProps {
  children: React.ReactNode
}

/**
 * @public
 */
export function Portal(props: PortalProps): React.ReactPortal | null {
  const portal = usePortal()

  if (!portal.element) {
    return null
  }

  return ReactDOM.createPortal(props.children, portal.element)
}
