import type {Breakpoint, ResponsiveProp} from '@sanity/ui/css'
import {useMemo} from 'react'

import {_getResponsiveProp} from '../helpers/props'

/**
 * @internal
 * @deprecated use `_getResponsiveProp` directly instead, if necessary
 */
export function useResponsiveProp<T>(
  val: ResponsiveProp<T> | undefined,
  defaultVal?: Partial<Record<Breakpoint, T>>,
): Partial<Record<Breakpoint, T>> {
  return useMemo(() => _getResponsiveProp(val, defaultVal), [defaultVal, val])
}
