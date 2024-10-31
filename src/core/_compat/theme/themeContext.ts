import {Context} from 'react'

import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import {ThemeContextValue} from './types'

/**
 * @internal
 */
export const ThemeContext: Context<ThemeContextValue | null> =
  createGlobalScopedContext<ThemeContextValue | null>('@sanity/ui/context/theme', null)
