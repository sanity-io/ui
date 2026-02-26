import {createGlobalScopedContext} from '@sanity/ui/core'
import type {Context} from 'react'

import type {BoundaryElementContextValue} from './types'

/** @internal */
export const BoundaryElementContext: Context<BoundaryElementContextValue> =
  createGlobalScopedContext<BoundaryElementContextValue>('@sanity/ui/v4/boundaryElement', null)
