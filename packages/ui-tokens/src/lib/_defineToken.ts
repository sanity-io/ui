import type {ExplicitToken, TokenType} from './types'

export function _defineToken<const K extends TokenType>(token: ExplicitToken<K>): ExplicitToken<K> {
  return token
}
