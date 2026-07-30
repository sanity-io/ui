import {useMemo, useSyncExternalStore} from 'react'

import {PortalContext} from './portalContext'
import {PortalContextValue} from './types'

/**
 * @public
 */
export interface PortalProviderProps {
  /**
   * @deprecated Use `<BoundaryElementProvider element={...} />` instead
   */
  boundaryElement?: never
  children: React.ReactNode
  element?: HTMLElement | null
  /**
   * @beta
   */
  __unstable_elements?: Record<string, HTMLElement | null | undefined>
}

/**
 * @public
 */
export function PortalProvider(props: PortalProviderProps): React.JSX.Element {
  const {children, element, __unstable_elements: elements} = props
  const fallbackElement = useSyncExternalStore(
    emptySubscribe,
    () => document.body,
    () => null,
  )

  const value: PortalContextValue = useMemo(() => {
    return {
      version: 0.0,
      boundaryElement: null,
      element: element || fallbackElement,
      elements,
    }
  }, [element, elements, fallbackElement])

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}

const emptySubscribe = () => () => {}
