import type {ResponsiveProp} from '@sanity/ui/css'
import type {Context} from 'react'

import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import type {DialogPosition} from './types'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface DialogContextValue {
  version: 0.0
  position?: ResponsiveProp<DialogPosition>
  zOffset?: ResponsiveProp<number>
}

/**
 * @internal
 */
export const DialogContext: Context<DialogContextValue> =
  createGlobalScopedContext<DialogContextValue>('@sanity/ui/v3/dialog', {version: 0.0})
