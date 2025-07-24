import type {Context} from 'react'

import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import type {CardContextValue} from './types'

/**
 * @internal
 */
export const CardContext: Context<CardContextValue | null> =
  createGlobalScopedContext<CardContextValue | null>('@sanity/ui/v3/card', null)
