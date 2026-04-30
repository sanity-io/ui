import type {API, JSXOpeningElement} from 'jscodeshift'

import {getAttribute} from './getAttribute'
import {getAttributeValue} from './getAttributeValue'

export function addAttribute(
  j: API['jscodeshift'],
  node: JSXOpeningElement,
  name: string,
  value: unknown,
) {
  if (getAttribute(node.attributes, name)) {
    return
  }

  if (!node.attributes) {
    node.attributes = []
  }

  node.attributes.push(j.jsxAttribute(j.jsxIdentifier(name), getAttributeValue(j, value)))
}
