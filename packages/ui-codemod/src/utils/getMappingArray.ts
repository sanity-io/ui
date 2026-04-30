import {type API, type ArrayExpression} from 'jscodeshift'

import type {AnyExpression} from '../types/AnyExpression'
import type {AttributeMapping} from '../types/AttributeMods'
import {getMappingExpression} from './getMappingExpression'
import {getMappingValue} from './getMappingValue'

export function getMappingArray(
  j: API['jscodeshift'],
  arr: AnyExpression,
  mapping: AttributeMapping,
): ArrayExpression | null {
  if (arr.type !== 'ArrayExpression') {
    return null
  }

  const elements = arr.elements as (AnyExpression | null)[]
  const output: AnyExpression[] = []

  for (const el of elements) {
    if (el == null || el.type === 'SpreadElement') {
      return null
    }

    const mappingValue = getMappingValue(mapping, el)

    if (!mappingValue) {
      return null
    }

    output.push(getMappingExpression(j, mappingValue))
  }

  return j.arrayExpression(output as never[])
}
