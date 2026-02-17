import type {
  DTCGColorToken,
  DTCGDimensionToken,
  DTCGFontFamilyToken,
  DTCGFontWeightToken,
} from './schema'

/** @internal */
export function colorToken(value: DTCGColorToken['$value']): DTCGColorToken {
  return {
    $type: 'color',
    $value: value,
  }
}

/** @internal */
export function dimensionToken(value: DTCGDimensionToken['$value']): DTCGDimensionToken {
  return {
    $type: 'dimension',
    $value: value,
  }
}

/** @internal */
export function fontFamilyToken(value: DTCGFontFamilyToken['$value']): DTCGFontFamilyToken {
  return {
    $type: 'fontFamily',
    $value: value,
  }
}

/** @internal */
export function fontWeightToken(value: DTCGFontWeightToken['$value']): DTCGFontWeightToken {
  return {
    $type: 'fontWeight',
    $value: value,
  }
}
