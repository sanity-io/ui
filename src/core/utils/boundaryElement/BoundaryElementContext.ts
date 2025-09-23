import type {Context} from 'react'

import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import type {BoundaryElementContextValue} from './types'

export const BoundaryElementContext: Context<BoundaryElementContextValue> =
  createGlobalScopedContext<BoundaryElementContextValue>('@sanity/ui/v4/boundaryElement', null)
