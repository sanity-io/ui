import type {API, JSXAttribute, JSXSpreadAttribute} from 'jscodeshift'

import type {CompositeAttributeMapping} from '../types/AttributeMods'
import {getStaticAttributeExpression} from './getStaticAttributeExpression'

export function getCompositeAttrValue(
  j: API['jscodeshift'],
  attrs: (JSXAttribute | JSXSpreadAttribute)[],
  mapping: CompositeAttributeMapping,
) {
  let compositeAttrValue: string | null = null

  for (const compositeKey of Object.keys(mapping)) {
    const compositeMapping = mapping[compositeKey]

    if (!compositeMapping) {
      continue
    }

    let hasMatchingValues = true

    for (const propName of Object.keys(compositeMapping)) {
      const mappingValue = compositeMapping[propName]
      const attrValue = getStaticAttributeExpression(j, attrs, propName)

      if (mappingValue === undefined || attrValue !== mappingValue) {
        hasMatchingValues = false
        break
      }
    }

    if (hasMatchingValues) {
      compositeAttrValue = compositeKey
      break
    }
  }

  return compositeAttrValue
}
