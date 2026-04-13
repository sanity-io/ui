import type {_DTCGNumberToken} from '@sanity/ui-tokens/lib'

import type {SanityFigmaNumber, SanityFigmaNumberAlias} from '../types'

export function getFigmaNumberValue(
  token: _DTCGNumberToken,
): SanityFigmaNumber | SanityFigmaNumberAlias {
  if (typeof token.$value === 'string') {
    return {
      type: 'number-alias',
      target: token.$value.slice(1, -1).replace(/\./g, '/'),
    }
  }

  return {
    type: 'number',
    value: token.$value,
  }
}
