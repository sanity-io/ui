import { type API, ASTPath, JSXOpeningElement } from "jscodeshift";

export function insertTodo(
  j: API["jscodeshift"],
  path: ASTPath<JSXOpeningElement>,
  message: string,
) {
  const parent = path.parent;

  if (!parent || parent.node.type !== "JSXElement") {
    return;
  }

  const el = parent.node as {
    comments?: { type: string; value: string; leading?: boolean }[];
  };
  el.comments ??= [];

  if (el.comments.some((c) => c.value.includes(message))) {
    return;
  }

  el.comments.unshift(j.commentLine(` TODO: ${message}`, true));
}
