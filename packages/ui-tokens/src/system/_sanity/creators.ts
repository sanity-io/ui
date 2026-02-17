import type {SanityColorToken} from '../color/schema'
import type {SanityDimensionToken, SanityTokenScope} from './schema'

export function _sanityColorToken(
  value: SanityColorToken['$value'],
  options?: {scopes?: SanityTokenScope[]},
): SanityColorToken {
  return {
    $type: 'color',
    $value: value,
    $extensions: {
      'io.sanity': {
        scopes: options?.scopes,
      },
    },
  }
}

/** @internal */
export function _sanityDimensionToken(
  value: SanityDimensionToken['$value'],
  options?: {scopes?: SanityTokenScope[]},
): SanityDimensionToken {
  return {
    $type: 'dimension',
    $value: value,
    $extensions: {
      'io.sanity': {
        scopes: options?.scopes,
      },
    },
  }
}
