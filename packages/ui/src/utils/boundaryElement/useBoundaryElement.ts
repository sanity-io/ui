import {use, useMemo} from 'react'

import {BoundaryElementContext} from './BoundaryElementContext'
import type {BoundaryElementContextValue} from './types'

/** @public */
export function useBoundaryElement(): {version: 0.0; element: BoundaryElementContextValue} {
  // eslint-disable-next-line no-warning-comments
  // @TODO this wrapping is for BC and should be removed
  const element = use(BoundaryElementContext)
  return useMemo(() => ({version: 0.0, element}), [element])
}
