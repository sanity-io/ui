import {createGlobalScopedContext} from '../lib/createGlobalScopedContext'
import {ThemeContextValue} from './types'

/**
 * @internal
 */
export const ThemeContext = createGlobalScopedContext<ThemeContextValue | null>(
  '@sanity/ui/context/theme',
  null,
)
