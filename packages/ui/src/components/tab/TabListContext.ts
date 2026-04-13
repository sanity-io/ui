import type {Context} from 'react'

import {createGlobalScopedContext} from '../../core/lib/createGlobalScopedContext'
import type {TabContextListValue} from './types'

/**
 * @internal
 */
export const TabContext: Context<TabContextListValue | null> =
  createGlobalScopedContext<TabContextListValue | null>('@sanity/ui/v4/tree', null)
