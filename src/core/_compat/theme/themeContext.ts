import type {Context} from 'react'

import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import type {ThemeContextValue} from './types'

/**
 * @internal
 */
export const ThemeContext: Context<ThemeContextValue | null> =
  createGlobalScopedContext<ThemeContextValue | null>('@sanity/ui/v3/theme', null)
