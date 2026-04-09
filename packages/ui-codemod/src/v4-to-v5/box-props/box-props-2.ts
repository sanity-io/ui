import {
  type API,
  type Collection,
  type FileInfo,
  type JSXAttribute,
  type JSXOpeningElement,
  type ObjectProperty,
  type Property,
} from "jscodeshift";

/** Values we read from JSX; jscodeshift's `Expression` is not shaped for property access. */
type AnyExpression = Record<string, unknown> & { type: string };

type ModMappings = Record<string | number, string | boolean | number>;

type ModConfig =
  | { type: "empty" }
  | { type: "rename"; name: string }
  | { type: "style-only"; style: string }
  | { type: "style-mapped"; style: string; mappings: ModMappings }
  | { type: "mapped-only"; mappings: ModMappings };

const MODS: Record<string, ModConfig> = {
  alignItems: {
    type: "style-only",
    style: "alignItems",
  },
  border: {
    type: "mapped-only",
    mappings: {
      none: false,
      muted: true,
      default: true,
    },
  },
  borderTop: {
    type: "mapped-only",
    mappings: {
      none: false,
      muted: true,
      default: true,
    },
  },
  borderRight: {
    type: "mapped-only",
    mappings: {
      none: false,
      muted: true,
      default: true,
    },
  },
  borderBottom: {
    type: "mapped-only",
    mappings: {
      none: false,
      muted: true,
      default: true,
    },
  },
  borderLeft: {
    type: "mapped-only",
    mappings: {
      none: false,
      muted: true,
      default: true,
    },
  },
  borderWidth: { type: "empty" },
  flex: {
    type: "style-only",
    style: "flex",
  },
  flexDirection: {
    type: "style-only",
    style: "flexDirection",
  },
  flexWrap: {
    type: "style-only",
    style: "flexWrap",
  },
  gridAutoColumns: {
    type: "style-only",
    style: "gridAutoColumns",
  },
  gridAutoFlow: {
    type: "style-only",
    style: "gridAutoFlow",
  },
  gridAutoRows: {
    type: "style-only",
    style: "gridAutoRow",
  },
  gridColumn: {
    type: "mapped-only",
    mappings: {
      auto: "auto",
      full: "1 / -1",
      1: "span 1 / span 1",
      2: "span 2 / span 2",
      3: "span 3 / span 3",
      4: "span 4 / span 4",
      5: "span 5 / span 5",
      6: "span 6 / span 6",
      7: "span 7 / span 7",
      8: "span 8 / span 8",
      9: "span 9 / span 9",
      10: "span 10 / span 10",
      11: "span 11 / span 11",
      12: "span 12 / span 12",
    },
  },
  gridColumnEnd: {
    type: "mapped-only",
    mappings: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
    },
  },
  gridColumnStart: {
    type: "mapped-only",
    mappings: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
    },
  },
  gridRow: {
    type: "mapped-only",
    mappings: {
      auto: "auto",
      full: "1 / -1",
      1: "span 1 / span 1",
      2: "span 2 / span 2",
      3: "span 3 / span 3",
      4: "span 4 / span 4",
      5: "span 5 / span 5",
      6: "span 6 / span 6",
      7: "span 7 / span 7",
      8: "span 8 / span 8",
      9: "span 9 / span 9",
      10: "span 10 / span 10",
      11: "span 11 / span 11",
      12: "span 12 / span 12",
    },
  },
  gridRowEnd: {
    type: "mapped-only",
    mappings: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
    },
  },
  gridRowStart: {
    type: "mapped-only",
    mappings: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
    },
  },
  gridTemplateColumns: {
    type: "style-only",
    style: "gridTemplateColumns",
  },
  gridTemplateRows: {
    type: "style-only",
    style: "gridTemplateRows",
  },
  height: {
    type: "mapped-only",
    mappings: {
      fill: "100%",
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
      stretch: "stretch",
    },
  },
  insetTop: {
    type: "rename",
    name: "top",
  },
  insetRight: {
    type: "rename",
    name: "right",
  },
  insetBottom: {
    type: "rename",
    name: "bottom",
  },
  insetLeft: {
    type: "rename",
    name: "left",
  },
  justifyContent: {
    type: "style-only",
    style: "justifyContent",
  },
  minWidth: {
    type: "mapped-only",
    mappings: {
      full: "100%",
      0: "0",
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
    },
  },
  muted: { type: "empty" },
  outline: {
    type: "style-only",
    style: "outline",
  },
  pointerEvents: {
    type: "style-only",
    style: "pointerEvents",
  },
  shadow: { type: "empty" },
  sizing: {
    type: "style-mapped",
    style: "boxSizing",
    mappings: {
      content: "content-box",
      border: "border-box",
    },
  },
  textAlign: {
    type: "style-only",
    style: "textAlign",
  },
  width: {
    type: "mapped-only",
    mappings: {
      auto: "auto",
      fill: "100%",
      stretch: "stretch",
      min: "min-content",
      max: "max-content",
      0: "20rem",
      1: "40rem",
      2: "60rem",
      3: "80rem",
      4: "100rem",
      5: "120rem",
    },
  },
};

function getObjectPropertyKeyName(
  prop: ObjectProperty | Property,
): string | null {
  const key = prop.key;
  if (key.type === "Identifier") {
    return key.name;
  }
  if (key.type === "StringLiteral" || key.type === "Literal") {
    return String(key.value);
  }
  return null;
}

function getJsxAttrValueExpression(
  attr: JSXAttribute,
  j: API["jscodeshift"],
): AnyExpression | null {
  if (!attr.value) {
    return j.booleanLiteral(true) as unknown as AnyExpression;
  }
  if (attr.value.type === "StringLiteral" || attr.value.type === "Literal") {
    return attr.value as unknown as AnyExpression;
  }
  if (attr.value.type === "JSXExpressionContainer") {
    return attr.value.expression as unknown as AnyExpression;
  }
  return null;
}

function isConditionalOrIdentifier(expr: AnyExpression): boolean {
  return expr.type === "ConditionalExpression" || expr.type === "Identifier";
}

function literalKeyForMapping(expr: AnyExpression): string | null {
  if (expr.type === "NumericLiteral" || expr.type === "BooleanLiteral") {
    return String(expr.value);
  }
  if (expr.type === "StringLiteral" || expr.type === "Literal") {
    if (expr.value === null) {
      return "null";
    }
    return String(expr.value);
  }
  if (expr.type === "TemplateLiteral") {
    const expressions = expr.expressions as unknown[];
    const quasis = expr.quasis as { value: { cooked: string | null } }[];
    if (expressions.length === 0 && quasis.length === 1) {
      return quasis[0]?.value.cooked ?? null;
    }
  }
  return null;
}

function lookupMapping(
  mappings: ModMappings,
  key: string,
): string | boolean | number | undefined {
  if (Object.prototype.hasOwnProperty.call(mappings, key)) {
    return mappings[key];
  }
  const n = Number(key);
  if (!Number.isNaN(n) && Object.prototype.hasOwnProperty.call(mappings, n)) {
    return mappings[n];
  }
  return undefined;
}

function mappingValueToExpression(
  j: API["jscodeshift"],
  val: string | boolean | number,
): AnyExpression {
  if (typeof val === "boolean") {
    return j.booleanLiteral(val) as unknown as AnyExpression;
  }
  if (typeof val === "number") {
    return j.numericLiteral(val) as unknown as AnyExpression;
  }
  return j.stringLiteral(val) as unknown as AnyExpression;
}

function cloneExprForStyle(
  j: API["jscodeshift"],
  expr: AnyExpression,
): AnyExpression {
  if (expr.type === "StringLiteral") {
    return j.stringLiteral(expr.value as string) as unknown as AnyExpression;
  }
  if (expr.type === "Literal") {
    if (expr.value === null) {
      return j.literal(null) as unknown as AnyExpression;
    }
    if (typeof expr.value === "boolean") {
      return j.booleanLiteral(expr.value) as unknown as AnyExpression;
    }
    if (typeof expr.value === "number") {
      return j.numericLiteral(expr.value) as unknown as AnyExpression;
    }
    if (typeof expr.value === "string") {
      return j.stringLiteral(expr.value) as unknown as AnyExpression;
    }
  }
  if (expr.type === "NumericLiteral") {
    return j.numericLiteral(expr.value as number) as unknown as AnyExpression;
  }
  if (expr.type === "BooleanLiteral") {
    return j.booleanLiteral(expr.value as boolean) as unknown as AnyExpression;
  }
  return expr;
}

function canMoveToStyleAsStatic(expr: AnyExpression): boolean {
  if (isConditionalOrIdentifier(expr)) {
    return false;
  }
  if (expr.type === "ArrayExpression") {
    return false;
  }
  if (expr.type === "TemplateLiteral") {
    return false;
  }
  if (
    expr.type === "StringLiteral" ||
    expr.type === "Literal" ||
    expr.type === "NumericLiteral" ||
    expr.type === "BooleanLiteral" ||
    expr.type === "NullLiteral"
  ) {
    return true;
  }
  return false;
}

function tryMapArrayOnlyMappings(
  j: API["jscodeshift"],
  arr: AnyExpression,
  mappings: ModMappings,
): AnyExpression | null {
  if (arr.type !== "ArrayExpression") {
    return null;
  }
  const elements = arr.elements as (AnyExpression | null)[];
  const out: AnyExpression[] = [];
  for (const el of elements) {
    if (el == null || el.type === "SpreadElement") {
      return null;
    }
    const key = literalKeyForMapping(el);
    if (key === null) {
      return null;
    }
    const mapped = lookupMapping(mappings, key);
    if (mapped === undefined) {
      return null;
    }
    out.push(mappingValueToExpression(j, mapped));
  }
  return j.arrayExpression(out as never[]) as unknown as AnyExpression;
}

/** Whether `mergeStyleProperty` can merge into this opening element (existing `style` must be an expression object if present). */
function openingCanAcceptStyleMerge(opening: JSXOpeningElement): boolean {
  const attrs = opening.attributes;
  if (!attrs) {
    return true;
  }
  const styleIndex = attrs.findIndex(
    (a): a is JSXAttribute =>
      a.type === "JSXAttribute" &&
      a.name.type === "JSXIdentifier" &&
      a.name.name === "style",
  );
  if (styleIndex === -1) {
    return true;
  }
  const styleAttr = attrs[styleIndex] as JSXAttribute;
  return styleAttr.value?.type === "JSXExpressionContainer";
}

function mergeStyleProperty(
  j: API["jscodeshift"],
  opening: JSXOpeningElement,
  styleKey: string,
  valueExpr: AnyExpression,
): boolean {
  const newProp = j.objectProperty(j.identifier(styleKey), valueExpr as never);

  opening.attributes ??= [];
  const attrs = opening.attributes;
  const styleIndex = attrs.findIndex(
    (a): a is JSXAttribute =>
      a.type === "JSXAttribute" &&
      a.name.type === "JSXIdentifier" &&
      a.name.name === "style",
  );

  if (styleIndex === -1) {
    attrs.push(
      j.jsxAttribute(
        j.jsxIdentifier("style"),
        j.jsxExpressionContainer(j.objectExpression([newProp])),
      ),
    );
    return true;
  }

  const styleAttr = attrs[styleIndex] as JSXAttribute;
  if (styleAttr.value?.type !== "JSXExpressionContainer") {
    return false;
  }

  const expr = styleAttr.value.expression;

  if (expr.type === "ObjectExpression") {
    expr.properties = expr.properties.filter((p) => {
      if (p.type !== "ObjectProperty" && p.type !== "Property") {
        return true;
      }
      return getObjectPropertyKeyName(p) !== styleKey;
    });
    expr.properties.push(newProp);
    return true;
  }

  styleAttr.value = j.jsxExpressionContainer(
    j.objectExpression([j.spreadElement(expr as never), newProp]),
  );
  return true;
}

function addTodoBeforeBox(
  openingPath: { parent?: { node: { type?: string; comments?: unknown[] } } },
  j: API["jscodeshift"],
): void {
  const parent = openingPath.parent;
  if (!parent || parent.node.type !== "JSXElement") {
    return;
  }
  const el = parent.node as {
    comments?: { type: string; value: string; leading?: boolean }[];
  };
  el.comments ??= [];
  if (el.comments.some((c) => c.value.includes("Codemod could not update"))) {
    return;
  }
  el.comments.unshift(
    j.commentLine(" TODO: Codemod could not update the prop below", true),
  );
}

function modAttributeCanBeUpdated(
  j: API["jscodeshift"],
  opening: JSXOpeningElement,
  attr: JSXAttribute,
  mod: ModConfig,
): boolean {
  const expr = getJsxAttrValueExpression(attr, j);
  console.log("expr", expr);

  switch (mod.type) {
    case "empty":
      return true;
    case "rename":
      return attr.name.type === "JSXIdentifier";
    case "style-only":
      return (
        expr !== null &&
        canMoveToStyleAsStatic(expr) &&
        openingCanAcceptStyleMerge(opening)
      );
    case "style-mapped": {
      if (expr === null || isConditionalOrIdentifier(expr)) {
        return false;
      }
      const key = literalKeyForMapping(expr);
      if (key === null || lookupMapping(mod.mappings, key) === undefined) {
        return false;
      }
      return openingCanAcceptStyleMerge(opening);
    }
    case "mapped-only": {
      if (expr === null) {
        return false;
      }
      if (expr.type === "ArrayExpression") {
        return tryMapArrayOnlyMappings(j, expr, mod.mappings) !== null;
      }
      if (isConditionalOrIdentifier(expr)) {
        return false;
      }
      const key = literalKeyForMapping(expr);
      return key !== null && lookupMapping(mod.mappings, key) !== undefined;
    }
    default: {
      const _exhaustive: never = mod;
      return _exhaustive;
    }
  }
}

function processModAttribute(
  j: API["jscodeshift"],
  opening: JSXOpeningElement,
  attr: JSXAttribute,
  mod: ModConfig,
): "remove" | "handled" {
  const expr = getJsxAttrValueExpression(attr, j);

  switch (mod.type) {
    case "empty":
      return "remove";
    case "rename":
      if (attr.name.type === "JSXIdentifier") {
        attr.name.name = mod.name;
      }
      return "handled";
    case "style-only":
      mergeStyleProperty(j, opening, mod.style, cloneExprForStyle(j, expr!));
      return "remove";
    case "style-mapped": {
      const key = literalKeyForMapping(expr!);
      const mapped = lookupMapping(mod.mappings, key!);
      const valueExpr = mappingValueToExpression(j, mapped!);
      mergeStyleProperty(j, opening, mod.style, valueExpr);
      return "remove";
    }
    case "mapped-only":
      if (expr!.type === "ArrayExpression") {
        const mappedArr = tryMapArrayOnlyMappings(j, expr!, mod.mappings)!;
        if (attr.value?.type === "JSXExpressionContainer") {
          attr.value.expression = mappedArr as never;
        } else {
          attr.value = j.jsxExpressionContainer(mappedArr as never);
        }
        return "handled";
      }
      {
        const key = literalKeyForMapping(expr!);
        const mapped = lookupMapping(mod.mappings, key!);
        if (typeof mapped === "string") {
          attr.value = j.stringLiteral(mapped);
          return "handled";
        }
        const next = mappingValueToExpression(j, mapped!);
        attr.value = j.jsxExpressionContainer(next as never);
        return "handled";
      }
    default: {
      const _exhaustive: never = mod;
      return _exhaustive;
    }
  }
}

export default function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  root
    .find(j.JSXOpeningElement, {
      name: { type: "JSXIdentifier", name: "Box" },
    })
    .forEach((path) => {
      if (!path.node.attributes) {
        return;
      }

      const attrs = path.node.attributes;
      const removeIdxs: number[] = [];

      for (let i = 0, len = attrs.length; i < len; i++) {
        const attr = attrs[i];

        if (
          attr.type !== "JSXAttribute" ||
          attr.name.type !== "JSXIdentifier"
        ) {
          continue;
        }

        const mod = MODS[attr.name.name];

        if (!mod) {
          continue;
        }

        if (!modAttributeCanBeUpdated(j, path.node, attr, mod)) {
          addTodoBeforeBox(path, j);
          continue;
        }

        const result = processModAttribute(j, path.node, attr, mod);

        if (result === "remove") {
          removeIdxs.push(i);
        }
      }

      for (let k = removeIdxs.length - 1; k >= 0; k--) {
        attrs.splice(removeIdxs[k], 1);
      }
    });

  return root.toSource();
}
