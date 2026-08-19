import type {API, JSXOpeningElement} from 'jscodeshift'

import {getAttribute} from './getAttribute'
import {getAttributeValue} from './getAttributeValue'

/**
 * Adds a JSX attribute to the opening element if it doesn't already exist.
 * Returns whether the AST was updated.
 */
export function addAttribute(
  j: API['jscodeshift'],
  node: JSXOpeningElement,
  name: string,
  value: unknown,
): boolean {
  if (getAttribute(node.attributes, name)) {
    return false
  }

  if (!node.attributes) {
    node.attributes = []
  }

  node.attributes.push(j.jsxAttribute(j.jsxIdentifier(name), getAttributeValue(j, value)))
  return true
}
