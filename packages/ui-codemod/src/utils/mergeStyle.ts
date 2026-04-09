import { type JSXAttribute, type API, type JSXSpreadAttribute } from "jscodeshift";
import { type AnyExpression } from "../types/AnyExpression";

export function mergeStyle(
  j: API['jscodeshift'],
  attrs: (JSXAttribute | JSXSpreadAttribute)[],
  styleKey: string,
  styleExpression: AnyExpression,
) {
  const newProp = j.objectProperty(j.identifier(styleKey), styleExpression as never);

  const styleIndex = attrs.findIndex(
    (a): a is JSXAttribute =>
      a.type === 'JSXAttribute' &&
      a.name.type === 'JSXIdentifier' &&
      a.name.name === 'style'
  );

  if (styleIndex === -1) {
    attrs.push(
      j.jsxAttribute(
        j.jsxIdentifier('style'),
        j.jsxExpressionContainer(j.objectExpression([newProp]))
      )
    );
  
    return true;
  }

  const styleAttr = attrs[styleIndex] as JSXAttribute;

  if (styleAttr.value?.type !== 'JSXExpressionContainer') {
    return false;
  }

  const expr = styleAttr.value.expression;

  if (expr.type === 'ObjectExpression') {
    expr.properties = expr.properties.filter((prop) => {
      if (prop.type !== 'ObjectProperty' && prop.type !== 'Property') {
        return true;
      }

      const key = prop.key;

      const name =
        key.type === 'Identifier'
          ? key.name
          : key.type === 'StringLiteral' || key.type === 'Literal'
            ? String(key.value)
            : null;

      return name !== styleKey;
    });

    expr.properties.push(newProp);
    return true;
  }

  styleAttr.value = j.jsxExpressionContainer(
    j.objectExpression([j.spreadElement(expr as never), newProp])
  );

  return true;
}
