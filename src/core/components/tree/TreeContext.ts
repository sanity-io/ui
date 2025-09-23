import type {Context} from 'react'

import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import type {TreeContextValue} from './types'

/**
 * @internal
 */
export const TreeContext: Context<TreeContextValue | null> =
  createGlobalScopedContext<TreeContextValue | null>('@sanity/ui/v4/tree', null)
