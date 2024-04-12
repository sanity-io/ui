import {createGlobalScopedContext} from '../lib/createGlobalScopedContext'
import {ThemeContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/theme')

/**
 * @internal
 */
export const ThemeContext = createGlobalScopedContext<ThemeContextValue | null>(key, null)
