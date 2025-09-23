import {type ReactNode} from 'react'

import {BoundaryElementContext} from './BoundaryElementContext'

/** @public */
export interface BoundaryElementProviderProps {
  children: ReactNode
  element: HTMLElement | null
}

/** @public */
export function BoundaryElementProvider(props: BoundaryElementProviderProps): React.JSX.Element {
  const {children, element} = props

  return <BoundaryElementContext value={element}>{children}</BoundaryElementContext>
}
