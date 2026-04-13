import type {_DTCGDimensionToken} from '@sanity/ui-tokens/lib'

import type {SanityFigmaNumber, SanityFigmaNumberAlias} from '../types'

export function getFigmaDimensionValue(
  token: _DTCGDimensionToken,
): SanityFigmaNumber | SanityFigmaNumberAlias {
  if (typeof token.$value === 'string') {
    return {
      type: 'number-alias',
      target: token.$value.slice(1, -1).replace(/\./g, '/'),
    }
  }

  if (token.$value.unit === 'rem') {
    return {
      type: 'number',
      value: token.$value.value * 16,
    }
  }

  return {
    type: 'number',
    value: token.$value.value,
  }
}
