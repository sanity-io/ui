import {useContext} from 'react'
import {DialogContext} from './dialogContext'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useDialog() {
  return useContext(DialogContext)
}
