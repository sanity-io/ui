import React from 'react'
import ReactDOM from 'react-dom'
import {usePortal} from './usePortal'

interface PortalProps {
  children: React.ReactNode
}

export function Portal(props: PortalProps): React.ReactPortal | null {
  const portal = usePortal()

  if (!portal.element) {
    return null
  }

  return ReactDOM.createPortal(props.children, portal.element)
}
