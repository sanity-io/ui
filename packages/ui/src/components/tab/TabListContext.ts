import {createGlobalScopedContext} from '@sanity/ui/core'
import type {Context} from 'react'

import type {TabContextListValue} from './types'

/**
 * @internal
 */
export const TabContext: Context<TabContextListValue | null> =
  createGlobalScopedContext<TabContextListValue | null>('@sanity/ui/v4/tree', null)
