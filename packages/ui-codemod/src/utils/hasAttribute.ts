import type {JSXOpeningElement} from 'jscodeshift'

export function hasAttribute(node: JSXOpeningElement, name: string) {
  return node.attributes?.some(
    (attr) =>
      attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier' && attr.name.name === name,
  )
}
