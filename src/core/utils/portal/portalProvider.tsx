import {useMemo} from 'react'
import {useUnique} from '../../hooks/_internal'
import {useMounted} from '../../hooks/useMounted'
import {PortalContext} from './portalContext'
import {PortalContextValue} from './types'

/**
 * @public
 */
export interface PortalProviderProps {
  /**
   * @deprecated Use `<BoundaryElementProvider element={...} />` instead
   */
  boundaryElement?: HTMLElement | null
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
export function PortalProvider(props: PortalProviderProps): React.ReactElement {
  const {boundaryElement, children, element, __unstable_elements: elementsProp} = props
  const elements = useUnique(elementsProp)
  const mounted = useMounted()

  const value: PortalContextValue = useMemo(() => {
    return {
      version: 0.0,
      boundaryElement: boundaryElement || null,
      element: element || mounted ? document.body : null,
      elements,
    }
  }, [boundaryElement, element, elements, mounted])

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}
