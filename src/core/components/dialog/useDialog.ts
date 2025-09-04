import {use} from 'react'

import {DialogContext, type DialogContextValue} from './DialogContext'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useDialog(): DialogContextValue {
  return use(DialogContext)
}
