import {type ReactNode, useMemo} from 'react'

import {BoundaryElementContext} from './BoundaryElementContext'
import type {BoundaryElementContextValue} from './types'

/** @public */
export interface BoundaryElementProviderProps {
  children: ReactNode
  element: HTMLElement | null
}

/** @public */
export function BoundaryElementProvider(props: BoundaryElementProviderProps): React.JSX.Element {
  const {children, element} = props
  const value: BoundaryElementContextValue = useMemo(() => ({version: 0.0, element}), [element])

  return <BoundaryElementContext value={value}>{children}</BoundaryElementContext>
}
