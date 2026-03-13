import type {_DTCGDimensionValue} from '../lib/dtcg/types'
import {type SanityDimensionToken, type SanityTokenScope} from './sanity/types'

export function _px(
  px: number,
  options?: {scopes?: SanityTokenScope[]},
): {$value: _DTCGDimensionValue; $extensions: SanityDimensionToken['$extensions']} {
  return {
    $value: {value: px, unit: 'px'},
    $extensions: {
      'io.sanity': {
        scopes: options?.scopes,
      },
    },
  }
}
