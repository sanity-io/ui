import {_sanityDimensionToken} from './_sanity/creators'
import {type SanityDimensionToken, type SanityTokenScope} from './_sanity/schema'

export function _px(px: number, options?: {scopes?: SanityTokenScope[]}): SanityDimensionToken {
  return _sanityDimensionToken({value: px, unit: 'px'}, options)
}
