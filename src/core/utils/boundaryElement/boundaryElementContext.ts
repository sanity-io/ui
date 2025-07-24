import type {Context} from 'react'

import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import type {BoundaryElementContextValue} from './types'

export const BoundaryElementContext: Context<BoundaryElementContextValue | null> =
  createGlobalScopedContext<BoundaryElementContextValue | null>(
    '@sanity/ui/v3/boundaryElement',
    null,
  )
