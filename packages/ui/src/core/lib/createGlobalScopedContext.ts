/**
 * As `@sanity/ui` is declared as a dependency, and may be duplicated, sometimes across major versions
 * it's critical that vital react contexts are shared even when there is a duplicate.
 * If we used a model similar to `sanity` itself, or `styled-components`, this would be unnecessary as
 * those libraries enforce single instances.
 * Since we don't enforce it we have to support a sanity plugin being able to call hooks like `useToast`, and then
 * read the context setup by `sanity`, which calls `ToastProvider`, even if the provider and hook are different instances in memory.
 * It's also why it's vital that all changes to globally scoped providers remain fully backwards compatible to v1.
 */

import {type Context, createContext} from 'react'

import {globalScope} from './globalScope'

export function createGlobalScopedContext<ContextType, const T extends ContextType = ContextType>(
  /**
   * Enforce that all Symbol.for keys used for globally scoped contexts have a predictable prefix
   */
  key: `@sanity/ui/context/${string}`,
  defaultValue: T,
): Context<ContextType> {
  const symbol = Symbol.for(key)

  /**
   * Prevent errors about re-renders on React SSR on Next.js App Router
   */
  if (typeof document === 'undefined') {
    return createContext<ContextType>(defaultValue)
  }

  globalScope[symbol] = globalScope[symbol] || createContext<T>(defaultValue)

  return globalScope[symbol]
}
