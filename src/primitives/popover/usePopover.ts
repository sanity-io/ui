import {useContext} from 'react'
import {isRecord} from '../../lib/isRecord'
import {PopoverContext} from './popoverContext'
import type {PopoverContextValue} from './types'

/**
 * @public
 */
export function usePopover(): PopoverContextValue {
  const value = useContext(PopoverContext)

  if (!value) {
    throw new Error('usePopover(): missing context value')
  }

  // NOTE: This check is for future-compatiblity
  // - If the value is not an object, it’s not compatible with the current version
  // - If the value is an object, but doesn’t have `version: 0.0`, it’s not compatible with the current version
  if (!isRecord(value) || value.version !== 0.0) {
    throw new Error('usePopover(): the context value is not compatible')
  }

  return value
}
