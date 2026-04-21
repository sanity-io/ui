import type { API, JSXOpeningElement } from "jscodeshift"
import { getAttributeValue } from "./getAttributeValue"

export function addAttribute(
  j: API['jscodeshift'],
  node: JSXOpeningElement,
  name: string,
  value: unknown,
) {
  const hasAttribute = node.attributes?.some(
    (attr) =>
      attr.type === 'JSXAttribute' &&
      attr.name.type === 'JSXIdentifier' &&
      attr.name.name === name,
  )

  if (hasAttribute) {
    return
  }

  if (!node.attributes) {
    node.attributes = []
  }

  node.attributes.push(
    j.jsxAttribute(j.jsxIdentifier(name), getAttributeValue(j, value)),
  )
}
