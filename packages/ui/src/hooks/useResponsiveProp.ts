import {_getResponsiveProp} from '@sanity/ui/core'
import type {ResponsiveProp, ResponsivePropArray} from '@sanity/ui-css'

/**
 * @internal
 * @deprecated use `_getResponsiveProp` directly instead
 */
export function useResponsiveProp<T>(
  val: ResponsiveProp<T> | undefined,
  defaultVal?: ResponsivePropArray<T>,
): ResponsivePropArray<T> {
  return _getResponsiveProp(val, defaultVal)
}
