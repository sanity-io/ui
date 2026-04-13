import type {_DTCGDurationToken, _DTCGNumberToken} from '@sanity/ui-tokens/lib'

import type {SanityFigmaNumber, SanityFigmaNumberAlias} from '../types'

export function getFigmaDurationValue(
  token: _DTCGDurationToken,
): SanityFigmaNumber | SanityFigmaNumberAlias {
  if (typeof token.$value === 'string') {
    return {
      type: 'number-alias',
      target: token.$value.slice(1, -1).replace(/\./g, '/'),
    }
  }

  if (token.$value.unit === 'ms') {
    return {
      type: 'number',
      value: token.$value.value,
    }
  }

  if (token.$value.unit === 's') {
    return {
      type: 'number',
      value: token.$value.value * 1000,
    }
  }

  throw new Error(`Unsupported duration unit: ${token.$value.unit}`)
}
