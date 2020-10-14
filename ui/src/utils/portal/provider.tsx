import React from 'react'
import {PortalContext} from './context'

interface PortalProviderProps {
  boundaryElement?: HTMLElement | null
  children: React.ReactNode
  element: HTMLElement | null
}

export function PortalProvider(props: PortalProviderProps) {
  return (
    <PortalContext.Provider
      value={{
        boundaryElement: props.boundaryElement || null,
        element: props.element || document.body,
      }}
    >
      {props.children}
    </PortalContext.Provider>
  )
}
