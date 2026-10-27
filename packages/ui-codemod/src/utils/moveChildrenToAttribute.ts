import {type API, type ASTPath, type JSXOpeningElement} from 'jscodeshift'

import {addAttribute} from './addAttribute'
import {getAttribute} from './getAttribute'
import {type JSXElementChild, getStaticStringFromChild} from './getStaticStringFromChild'
import {insertTodoWarning} from './insertTodoWarning'

/**
 * Moves JSX element children onto an attribute and converts the element to self-closing.
 * Returns whether the AST was updated.
 */
export function moveChildrenToAttribute(
  j: API['jscodeshift'],
  path: ASTPath<JSXOpeningElement>,
  name: string,
  options: {
    stringOnly?: boolean
    todoWarning?: string
  } = {},
): boolean {
  const {stringOnly = false, todoWarning} = options
  const parentNode = path.parent?.node
  const warning = todoWarning ?? `Move the children into the ${name} prop.`

  if (parentNode?.type !== 'JSXElement') {
    return false
  }

  const element = parentNode
  const children = ((element.children ?? []) as JSXElementChild[]).filter(
    (child) => !(child.type === 'JSXText' && child.value.trim() === ''),
  )

  if (children.length === 0) {
    return false
  }

  const opening = path.node

  if (getAttribute(opening.attributes, name)) {
    return insertTodoWarning(j, path, warning)
  }

  if (stringOnly) {
    if (children.length !== 1) {
      return insertTodoWarning(j, path, warning)
    }

    const staticValue = getStaticStringFromChild(children[0]!)

    if (staticValue === undefined) {
      return insertTodoWarning(j, path, warning)
    }

    addAttribute(j, opening, name, staticValue)
    element.children = []
    element.closingElement = null
    opening.selfClosing = true
    return true
  }

  if (children.length === 1) {
    const child = children[0]!

    if (child.type === 'JSXText') {
      addAttribute(j, opening, name, child.value.trim())
    } else if (child.type === 'JSXExpressionContainer') {
      addAttribute(j, opening, name, child.expression)
    } else {
      addAttribute(j, opening, name, child)
    }

    element.children = []
    element.closingElement = null
    opening.selfClosing = true
    return true
  }

  addAttribute(
    j,
    opening,
    name,
    j.jsxFragment(j.jsxOpeningFragment(), j.jsxClosingFragment(), children),
  )
  element.children = []
  element.closingElement = null
  opening.selfClosing = true

  return true
}
