import React, {useMemo} from 'react'
import {PortalContext, PortalContextValue} from './portalContext'

interface PortalProviderProps {
  boundaryElement?: HTMLElement | null
  children: React.ReactNode
  element: HTMLElement | null
}

const __BROWSER__ = typeof window !== 'undefined'

export function PortalProvider(props: PortalProviderProps) {
  const {boundaryElement, children, element} = props

  const value: PortalContextValue = useMemo(() => {
    return {
      version: 0.0,
      boundaryElement: boundaryElement || null,
      element: element || (__BROWSER__ && document.body) || null,
    }
  }, [boundaryElement, element])

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}
