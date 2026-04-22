import type {API, JSXOpeningElement} from 'jscodeshift'

import {getAttributeValue} from './getAttributeValue'
import {hasAttribute} from './hasAttribute'

export function addAttribute(
  j: API['jscodeshift'],
  node: JSXOpeningElement,
  name: string,
  value: unknown,
) {
  if (hasAttribute(node, name)) {
    return
  }

  if (!node.attributes) {
    node.attributes = []
  }

  node.attributes.push(j.jsxAttribute(j.jsxIdentifier(name), getAttributeValue(j, value)))
}
