import {createGlobalScopedContext} from '@sanity/ui/core'
import type {Context} from 'react'

import type {CardContextValue} from './types'

/**
 * @internal
 */
export const CardContext: Context<CardContextValue | null> =
  createGlobalScopedContext<CardContextValue | null>('@sanity/ui/v4/card', null)
