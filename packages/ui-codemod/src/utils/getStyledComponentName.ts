export function getStyledComponentName(node: unknown): string | null {
  if (!node || typeof node !== 'object' || !('type' in node)) {
    return null
  }

  const current = node as {
    type: string
    callee?: unknown
    tag?: unknown
    object?: unknown
    arguments?: unknown[]
  }

  if (current.type === 'TaggedTemplateExpression') {
    return getStyledComponentName(current.tag)
  }

  if (current.type === 'CallExpression') {
    const callee = current.callee

    if (
      callee &&
      typeof callee === 'object' &&
      'type' in callee &&
      callee.type === 'Identifier' &&
      'name' in callee &&
      callee.name === 'styled'
    ) {
      const arg = current.arguments?.[0]

      if (
        arg &&
        typeof arg === 'object' &&
        'type' in arg &&
        arg.type === 'Identifier' &&
        'name' in arg
      ) {
        return arg.name as string
      }

      return null
    }

    return getStyledComponentName(callee)
  }

  if (current.type === 'MemberExpression' && current.object) {
    return getStyledComponentName(current.object)
  }

  return null
}
