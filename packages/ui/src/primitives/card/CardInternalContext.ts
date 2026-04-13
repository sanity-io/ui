import type {Context} from 'react'

import {createGlobalScopedContext} from '../../core/lib/createGlobalScopedContext'
import type {_CardInternalContextValue} from './types'

/**
 * @internal
 */
export const CardInternalContext: Context<_CardInternalContextValue | null> =
  createGlobalScopedContext<_CardInternalContextValue | null>('@sanity/ui/v4/card-internal', null)
