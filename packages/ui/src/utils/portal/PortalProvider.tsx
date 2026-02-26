import {type ReactNode, use, useMemo, useSyncExternalStore} from 'react'

import {PortalContext} from './PortalContext'
import type {PortalContextValue} from './types'

/** @public */
export interface PortalProviderProps {
  children: ReactNode
  element?: HTMLElement | null
  /**
   * @beta
   */
  __unstable_elements?: Record<string, HTMLElement | null | undefined>
}

/** @public */
export function PortalProvider(props: PortalProviderProps): React.JSX.Element {
  const {children, element, __unstable_elements: elements} = props
  const parentPortal = use(PortalContext)
  const fallbackElement = useSyncExternalStore(
    emptySubscribe,
    () => elements?.['default'] ?? (parentPortal.element || document.body),
    () => null,
  )

  const value = useMemo(() => {
    return {
      version: 0.0,
      boundaryElement: null,
      element: element || fallbackElement,
      elements,
    } satisfies PortalContextValue
  }, [element, elements, fallbackElement])

  return <PortalContext value={value}>{children}</PortalContext>
}

const emptySubscribe = () => () => {}
