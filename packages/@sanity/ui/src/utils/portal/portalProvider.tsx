import React, {useMemo} from 'react'
import {PortalContext} from './portalContext'
import {PortalContextValue} from './types'

/**
 * @public
 */
export interface PortalProviderProps {
  boundaryElement?: HTMLElement | null
  children: React.ReactNode
  element: HTMLElement | null
}

const __BROWSER__ = typeof window !== 'undefined'

/**
 * @public
 */
export function PortalProvider(props: PortalProviderProps): React.ReactElement {
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
