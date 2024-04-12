/**
 * To improve performance and DevEx for things such as Hot Module Replacement,
 * we want to preserve created contexts between reloads.
 * It also helps with module duplication and other issues.
 */

import {createContext, type Context} from 'react'
import {globalScope} from './globalScope'

export function createGlobalScopedContext<ContextType, const T extends ContextType = ContextType>(
  key: symbol,
  defaultValue: T,
): Context<ContextType> {
  /**
   * Prevent errors about re-renders on React SSR on Next.js App Router
   */
  if (typeof document === 'undefined') {
    return createContext<ContextType>(defaultValue)
  }

  globalScope[key] = globalScope[key] || createContext<T>(defaultValue)

  return globalScope[key]
}
