import type {JSXAttribute, JSXElement} from 'jscodeshift'

export function getAttribute(
  attrs: JSXElement['openingElement']['attributes'],
  name: string,
): JSXAttribute | undefined {
  if (!attrs) {
    return undefined
  }

  for (const attr of attrs) {
    if (
      attr.type === 'JSXAttribute' &&
      attr.name.type === 'JSXIdentifier' &&
      attr.name.name === name
    ) {
      return attr
    }
  }

  return undefined
}
