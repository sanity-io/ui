import type {_DTCGTokenGroup} from './types'

export function _defineTokens<const T extends _DTCGTokenGroup>(tokens: T): T {
  return tokens
}
