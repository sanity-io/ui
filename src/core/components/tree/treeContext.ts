import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import {TreeContextValue} from './types'

/**
 * @internal
 */
export const TreeContext = createGlobalScopedContext<TreeContextValue | null>(
  '@sanity/ui/context/tree',
  null,
)
