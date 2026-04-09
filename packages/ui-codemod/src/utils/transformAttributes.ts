import { type ASTPath, type JSXOpeningElement, type API, type JSXAttribute, type JSXSpreadAttribute } from "jscodeshift";
import { AnyExpression, type AttributeMods } from "../types/AnyExpression";
import { getAttributeExpression } from "./getAttributeExpression";
import { insertTodo } from "./insertTodo";
import { mergeStyle } from "./mergeStyle";
import { getStyleExpression } from "./getStyleExpression";
import { getMappingKey } from "./getMappingKey";
import { getMappingValue } from "./getMappingValue";
import { getMappingExpression } from "./getMappingExpression";
import { getMappingArray } from "./getMappingArray";
import { canMoveUnmappedStyle } from "./canMoveUnmappedStyle";

function isConditionalOrIdentifier(expr: AnyExpression): boolean {
  return expr.type === 'ConditionalExpression' || expr.type === 'Identifier';
}

export function transformAttributes(
  j: API['jscodeshift'],
  path: ASTPath<JSXOpeningElement>,
  mods: AttributeMods,
  todoMessage: string 
) {
  if (!path.node.attributes) {
    return
  }

  const attrs = path.node.attributes;
  const removeIdxs: number[] = [];

  for (let i = 0, len = attrs.length; i < len; i++) {
    const attr = attrs[i];

    if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
      continue;
    }

    const mod = mods[attr.name.name];

    if (!mod) {
      continue;
    }

    const expr = getAttributeExpression(attr, j);

    if (mod.type === 'remove') {
      removeIdxs.push(i);
      continue
    }

    if (mod.type === 'rename') {
      if (attr.name.type === 'JSXIdentifier') {
        attr.name.name = mod.name;
      }

      continue
    }

    if (mod.type === 'style-only') {
      if (!expr || !canMoveUnmappedStyle(expr) || isConditionalOrIdentifier(expr)) {
        insertTodo(j, path, todoMessage);
        continue
      }

      const merged = mergeStyle(j, attrs, mod.style, getStyleExpression(j, expr));
      
      if (merged) {
        removeIdxs.push(i);
      } else {
        insertTodo(j, path, todoMessage);
      }

      continue
    }

    if (mod.type === 'style-mapped') {
      if (!expr || isConditionalOrIdentifier(expr)) {
        insertTodo(j, path, todoMessage);
        continue
      }

      const styleKey = getMappingKey(expr);
      const styleValue = getMappingValue(mod.mappings, styleKey);

      if (!styleKey || !styleValue) {
        continue
      }

      const styleExpression = getMappingExpression(j, styleValue);
      const merged = mergeStyle(j, attrs, mod.style, styleExpression);

      if (merged) {
        removeIdxs.push(i);
      } else {
        insertTodo(j, path, todoMessage);
      }

      continue
    }

    if (mod.type === 'mapped-only') {
      // if (isConditionalOrIdentifier(expr)) {
      //   addTodoBeforeBox(path, j);
      //   continue
      // }
      
      if (expr && expr.type === 'ArrayExpression') {
        const styleArray = getMappingArray(j, expr, mod.mappings);

        if (!styleArray) {
          insertTodo(j, path, todoMessage);
          continue
        }

        if (attr.value?.type === 'JSXExpressionContainer') {
          attr.value.expression = styleArray;
        } else {
          attr.value = j.jsxExpressionContainer(styleArray);
        }
        
        continue
      }

      const styleKey = getMappingKey(expr!);
      const styleValue = getMappingValue(mod.mappings, styleKey!);

      if (!styleKey || !styleValue) {
        continue
      }

      if (typeof styleValue === 'string') {
        attr.value = j.stringLiteral(styleValue);
        continue
      }
    
      const styleExpression = getMappingExpression(j, styleValue!);
      attr.value = j.jsxExpressionContainer(styleExpression);
      continue
    }
  }

  for (let k = removeIdxs.length - 1; k >= 0; k--) {
    attrs.splice(removeIdxs[k], 1);
  }
}
