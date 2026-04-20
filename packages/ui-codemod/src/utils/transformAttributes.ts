import {type API, type ASTPath, type JSXOpeningElement} from 'jscodeshift'

import {type AttributeMods} from '../types/AnyExpression'
import {getAttributeExpression} from './getAttributeExpression'
import {getMappingArray} from './getMappingArray'
import {getMappingExpression} from './getMappingExpression'
import {getMappingValue} from './getMappingValue'
import {getStyleExpression} from './getStyleExpression'
import {insertTodoWarning} from './insertTodoWarning'
import {isValidStyleType} from './isValidStyleType'
import {mergeStyle} from './mergeStyle'

export function transformAttributes(
  j: API['jscodeshift'],
  path: ASTPath<JSXOpeningElement>,
  mods: AttributeMods,
  todoWarning: string,
) {
  if (!path.node.attributes) {
    return
  }

  const attrs = path.node.attributes
  const removeIdxs: number[] = []

  for (let i = 0, len = attrs.length; i < len; i++) {
    const attr = attrs[i]

    if (!attr || attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
      continue
    }

    const mod = mods[attr.name.name]
    const expr = getAttributeExpression(attr, j)

    if (!mod || !expr) {
      continue
    }

    if (mod.type === 'remove') {
      removeIdxs.push(i)
    }

    if (mod.type === 'rename-only') {
      if (attr.name.type === 'JSXIdentifier') {
        attr.name.name = mod.name
      }
    }

    if (mod.type === 'style-only') {
      if (!expr || !isValidStyleType(expr)) {
        insertTodoWarning(j, path, todoWarning)
        continue
      }

      const merged = mergeStyle(j, attrs, mod.style, getStyleExpression(j, expr))

      if (merged) {
        removeIdxs.push(i)
      } else {
        insertTodoWarning(j, path, todoWarning)
      }
    }

    if (mod.type === 'style-mapped') {
      if (!expr || !isValidStyleType(expr)) {
        insertTodoWarning(j, path, todoWarning)
        continue
      }

      const styleValue = getMappingValue(mod.mappings, expr)

      if (!styleValue) {
        insertTodoWarning(j, path, todoWarning)
        continue
      }

      const merged = mergeStyle(j, attrs, mod.style, getMappingExpression(j, styleValue))

      if (merged) {
        removeIdxs.push(i)
      } else {
        insertTodoWarning(j, path, todoWarning)
      }
    }

    if (mod.type === 'mapped-only' || mod.type === 'rename-mapped') {
      if (mod.type === 'rename-mapped') {
        if (attr.name.type === 'JSXIdentifier') {
          attr.name.name = mod.name
        }
      }

      if (expr.type === 'ConditionalExpression' || expr.type === 'Identifier') {
        insertTodoWarning(j, path, todoWarning)
        continue
      }

      if (expr.type === 'ArrayExpression') {
        const styleArray = getMappingArray(j, expr, mod.mappings)

        if (!styleArray) {
          insertTodoWarning(j, path, todoWarning)
          continue
        }

        if (attr.value?.type === 'JSXExpressionContainer') {
          attr.value.expression = styleArray
        } else {
          attr.value = j.jsxExpressionContainer(styleArray)
        }

        continue
      }

      const styleValue = getMappingValue(mod.mappings, expr)

      if (!styleValue) {
        insertTodoWarning(j, path, todoWarning)
        continue
      }

      if (typeof styleValue === 'string') {
        attr.value = j.stringLiteral(styleValue)
        continue
      }

      attr.value = j.jsxExpressionContainer(getMappingExpression(j, styleValue) as never)
    }
  }

  for (let k = removeIdxs.length - 1; k >= 0; k--) {
    const i = removeIdxs[k]

    if (i !== undefined) {
      attrs.splice(i, 1)
    }
  }
}
