import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import {DialogPosition} from '../../types'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface DialogContextValue {
  version: 0.0
  position?: DialogPosition | DialogPosition[]
  zOffset?: number | number[]
}

const key = Symbol.for('@sanity/ui/context/dialog')

/**
 * @internal
 */
export const DialogContext = createGlobalScopedContext<DialogContextValue>(key, {
  version: 0.0,
})
