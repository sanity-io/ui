/* eslint-disable @typescript-eslint/no-explicit-any */
import {useContext} from 'react'

import {isRecord} from '../../lib/isRecord'
import {ToneContext} from './toneContext'
import {ToneContextValue} from './types'

/**
 * @public
 */
export function useToneContext(): ToneContextValue {
  const value: unknown = useContext(ToneContext)

  if (!value) {
    return {
      scheme: 'light',
      tone: 'default',
      version: 0.0,
    }
  }

  // NOTE: This check is for future-compatiblity
  // - If the value is not an object, it’s not compatible with the current version
  // - If the value is an object, but doesn’t have `version: 0.0`, it’s not compatible with the current version
  if (!isRecord(value) || value.version !== 0.0) {
    throw new Error('useToneContext(): the context value is not compatible')
  }

  return value as any as ToneContextValue
}
