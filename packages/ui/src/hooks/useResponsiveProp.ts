import type {ResponsiveProp, ResponsivePropArray} from '@sanity/ui-css'

import {_getResponsiveProp} from '../core/helpers/props'

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
