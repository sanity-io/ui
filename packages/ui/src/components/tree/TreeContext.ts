import {createGlobalScopedContext} from '@sanity/ui/core'
import type {Context} from 'react'

import type {TreeContextValue} from './types'

/**
 * @internal
 */
export const TreeContext: Context<TreeContextValue | null> =
  createGlobalScopedContext<TreeContextValue | null>('@sanity/ui/v4/tree', null)
