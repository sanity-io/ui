import {
  type API,
  type Collection,
  type FileInfo,
  type JSXAttribute,
  type JSXOpeningElement,
  type ObjectProperty,
  type Property,
} from 'jscodeshift';

const SIZING_TO_BOX_SIZING: Record<string, string> = {
  content: 'content-box',
  border: 'border-box',
  'content-box': 'content-box',
  'border-box': 'border-box',
};

function getAttrStringValue(attr: JSXAttribute): string | null {
  if (!attr.value) {
    return null;
  }
  if (attr.value.type === 'StringLiteral' || attr.value.type === 'Literal') {
    return String(attr.value.value);
  }
  if (attr.value.type === 'JSXExpressionContainer') {
    const expr = attr.value.expression;
    if (expr.type === 'StringLiteral' || expr.type === 'Literal') {
      return String(expr.value);
    }
    if (
      expr.type === 'TemplateLiteral' &&
      expr.expressions.length === 0 &&
      expr.quasis.length === 1
    ) {
      const q = expr.quasis[0]?.value.cooked;
      return q ?? null;
    }
  }
  return null;
}

function getObjectPropertyKeyName(prop: ObjectProperty | Property): string | null {
  const key = prop.key;
  if (key.type === 'Identifier') {
    return key.name;
  }
  if (key.type === 'StringLiteral' || key.type === 'Literal') {
    return String(key.value);
  }
  return null;
}

function applyBoxSizingToStyle(
  j: API['jscodeshift'],
  opening: JSXOpeningElement,
  boxSizing: string
): boolean {
  const newProp = j.objectProperty(
    j.identifier('boxSizing'),
    j.stringLiteral(boxSizing)
  );

  opening.attributes ??= [];
  const attrs = opening.attributes;
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
    expr.properties = expr.properties.filter((p) => {
      if (p.type !== 'ObjectProperty' && p.type !== 'Property') {
        return true;
      }
      return getObjectPropertyKeyName(p) !== 'boxSizing';
    });
    expr.properties.push(newProp);
    return true;
  }

  // Non-object `style` values become `{ ...expr, boxSizing }` (expr widened for recast builders).
  styleAttr.value = j.jsxExpressionContainer(
    j.objectExpression([j.spreadElement(expr as never), newProp])
  );
  return true;
}

export default function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const openings: Collection<JSXOpeningElement> = root.find(j.JSXOpeningElement, {
    name: { type: 'JSXIdentifier', name: 'Box' },
  });

  openings.forEach((path) => {
    const opening = path.node;
    opening.attributes ??= [];
    const attrs = opening.attributes;
    const sizingIndex = attrs.findIndex(
      (a): a is JSXAttribute =>
        a.type === 'JSXAttribute' &&
        a.name.type === 'JSXIdentifier' &&
        a.name.name === 'sizing'
    );

    if (sizingIndex === -1) {
      return;
    }

    const sizingAttr = attrs[sizingIndex] as JSXAttribute;
    const raw = getAttrStringValue(sizingAttr);
    if (raw === null) {
      return;
    }

    const boxSizing = SIZING_TO_BOX_SIZING[raw];
    if (boxSizing === undefined) {
      return;
    }

    const applied = applyBoxSizingToStyle(j, opening, boxSizing);
    if (applied) {
      attrs.splice(sizingIndex, 1);
    }
  });

  return root.toSource();
}
