import {useMemo, useRef, useSyncExternalStore} from 'react'

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
export function PortalProvider(props: PortalProviderProps): React.JSX.Element {
  const {boundaryElement, children, element, __unstable_elements: elementsProp} = props
  const elements = useUnique(elementsProp)
  const fallbackElement = useSyncExternalStore(
    emptySubscribe,
    () => document.body,
    () => null,
  )

  const value: PortalContextValue = useMemo(() => {
    return {
      version: 0.0,
      boundaryElement: boundaryElement || null,
      element: element || fallbackElement,
      elements,
    }
  }, [boundaryElement, element, elements, fallbackElement])

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}

PortalProvider.displayName = 'PortalProvider'

const emptySubscribe = () => () => {}

/**
 * This is a React hook to make sure that a record identity is the same on every render. Uses strict
 * equality comparison (eg by identity), and only goes one level deep.
 */
function useUnique<ValueType extends Comparable = Comparable>(value: ValueType): ValueType {
  const valueRef = useRef<ValueType>(value)

  // eslint-disable-next-line react-hooks/refs
  if (!_isEqual(valueRef.current, value)) {
    // eslint-disable-next-line react-hooks/refs
    valueRef.current = value
  }

  // eslint-disable-next-line react-hooks/refs
  return valueRef.current
}

function _isEqual(objA: Comparable, objB: Comparable): boolean {
  if (!objA || !objB) {
    return objA === objB
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  return keysA.every((key) => objA[key] === objB[key])
}

type Comparable = Record<string | number | symbol, unknown> | undefined | null
