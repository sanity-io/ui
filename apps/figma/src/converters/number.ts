import type {DTCGNumberToken} from '@sanity/ui-tokens/system'

import type {SanityFigmaNumber, SanityFigmaNumberAlias} from '../types'

export function getFigmaNumberValue(
  token: DTCGNumberToken,
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
