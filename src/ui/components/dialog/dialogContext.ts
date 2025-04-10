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

/**
 * @internal
 */
export const DialogContext = createGlobalScopedContext<DialogContextValue>(
  '@sanity/ui/context/dialog',
  {version: 0.0},
)
