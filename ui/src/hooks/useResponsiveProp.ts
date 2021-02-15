import {useMemo} from 'react'
import {getResponsiveProp} from '../styles'

/**
 * @beta This API might change. DO NOT USE IN PRODUCTION.
 */
export function useResponsiveProp<T = number>(val: T | T[] | undefined, defaultVal?: T[]): T[] {
  return useMemo(() => getResponsiveProp(val, defaultVal), [defaultVal, val])
}
