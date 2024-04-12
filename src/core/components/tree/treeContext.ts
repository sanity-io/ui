import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import {TreeContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/tree')

/**
 * @internal
 */
export const TreeContext = createGlobalScopedContext<TreeContextValue | null>(key, null)
