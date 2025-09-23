import type {Breakpoint, ResponsiveProp} from '@sanity/ui/css'

import {EMPTY_ARRAY} from '../constants'
import {isArray} from '../lib/isArray'
import {isRecord} from '../lib/isRecord'

/**
 * @internal
 */
export function _getResponsiveProp<T>(
  val: ResponsiveProp<T> | undefined,
  defaultVal?: Partial<Record<Breakpoint, T>>,
): Partial<Record<Breakpoint, T>> {
  if (val === undefined) {
    return (defaultVal || EMPTY_ARRAY) as Partial<Record<Breakpoint, T>>
  }

  return (isArray(val) || isRecord(val) ? val : [val]) as Partial<Record<Breakpoint, T>>
}
