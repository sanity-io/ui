import type {ValidateGroup} from './types'

export function _defineTokenGroup<const T extends object>(tokens: T & ValidateGroup<T>): T {
  return tokens
}
