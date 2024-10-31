/** @internal */
export function _getClassNames(...classNames: Array<string | false | undefined>): string[] {
  return classNames
    .map((n) => typeof n === 'string' && n.trim())
    .filter(Boolean)
    .join(' ')
    .split(' ')
}

/** @public */
export function composeClassNames(
  ...classNames: Array<string | false | undefined>
): string | undefined {
  return unique(_getClassNames(...classNames)).join(' ') || undefined
}

function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}
