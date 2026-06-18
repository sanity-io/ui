import {type API, type ASTPath, type JSXOpeningElement} from 'jscodeshift'

import {type AttributeMods} from '../types/AttributeMods'
import {getAttribute} from './getAttribute'
import {getAttributeExpression} from './getAttributeExpression'
import {getCompositeAttrValue} from './getCompositeAttrValue'
import {getMappingArray} from './getMappingArray'
import {getMappingExpression} from './getMappingExpression'
import {getMappingValue} from './getMappingValue'
import {getShorthandAttributes} from './getShorthandAttributes'
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

  for (const [attrName, mod] of Object.entries(mods)) {
    if (mod?.type !== 'warn-missing') {
      continue
    }

    if (getAttribute(attrs, attrName)) {
      continue
    }

    insertTodoWarning(j, path, mod.warning || todoWarning)
  }

  for (let i = 0; i < attrs.length; i++) {
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

    if (mod.type === 'warn-only') {
      insertTodoWarning(j, path, mod.warning || todoWarning)
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

      const styleValue = getMappingValue(mod.mapping, expr)

      if (styleValue === undefined) {
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

    if (mod.type === 'shorthand-mapped') {
      if (expr.type === 'ConditionalExpression' || expr.type === 'Identifier') {
        insertTodoWarning(j, path, todoWarning)
        continue
      }

      const shorthandAttrs = getShorthandAttributes(j, expr, mod)

      if (shorthandAttrs.length) {
        attrs.splice(i + 1, 0, ...shorthandAttrs)
        removeIdxs.push(i)
      } else {
        insertTodoWarning(j, path, todoWarning)
      }
    }

    if (mod.type === 'composite') {
      const triggerName = attr.name.name
      const compositeValue = getCompositeAttrValue(j, attrs, mod.mapping)

      if (!compositeValue) {
        insertTodoWarning(j, path, todoWarning)
        continue
      }

      if (attr.name.type === 'JSXIdentifier') {
        attr.name.name = mod.name
      }

      attr.value = j.stringLiteral(compositeValue)

      for (const attrName of Object.keys(mod.mapping[compositeValue] || {})) {
        if (attrName === triggerName) {
          continue
        }

        const otherAttr = getAttribute(attrs, attrName)

        if (otherAttr) {
          const k = attrs.indexOf(otherAttr)

          if (k !== -1) {
            removeIdxs.push(k)
          }
        }
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
        const styleArray = getMappingArray(j, expr, mod.mapping)

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

      const styleValue = getMappingValue(mod.mapping, expr)

      if (styleValue === undefined) {
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

  const idxsToRemove = [...new Set(removeIdxs)].sort((a, b) => b - a)

  for (const i of idxsToRemove) {
    attrs.splice(i, 1)
  }
}
