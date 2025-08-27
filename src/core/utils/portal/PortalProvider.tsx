import {type ReactNode, useContext, useMemo, useRef, useSyncExternalStore} from 'react'

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
  const {children, element, __unstable_elements: elementsProp} = props
  const elements = useUnique(elementsProp)
  const parentPortal = useContext(PortalContext)
  const fallbackElement = useSyncExternalStore(
    emptySubscribe,
    () => elements?.['default'] ?? (parentPortal.element || document.body),
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

/**
 * This is a React hook to make sure that a record identity is the same on every render. Uses strict
 * equality comparison (eg by identity), and only goes one level deep.
 */
function useUnique<ValueType extends Comparable = Comparable>(value: ValueType): ValueType {
  const valueRef = useRef<ValueType>(value)

  if (!_isEqual(valueRef.current, value)) {
    valueRef.current = value
  }

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
