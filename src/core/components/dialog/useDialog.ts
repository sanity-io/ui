import {useContext} from 'react'

import {DialogContext, type DialogContextValue} from './dialogContext'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useDialog(): DialogContextValue {
  return useContext(DialogContext)
}
