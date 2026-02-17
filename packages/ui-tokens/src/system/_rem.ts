import type {DTCGDimensionToken} from './_dtcg/schema'
import {_sanityDimensionToken} from './_sanity/creators'
import {type SanityTokenScope} from './_sanity/schema'

export function _rem(px: number, options?: {scopes?: SanityTokenScope[]}): DTCGDimensionToken {
  return _sanityDimensionToken({value: px / 16, unit: 'rem'}, options)
}
