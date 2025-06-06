/** @internal */
export function _getClassNames(...classNames: Array<string | false | undefined>): string[] {
  return classNames
    .map((n) => typeof n === 'string' && n.trim())
    .filter(Boolean)
    .join(' ')
    .split(' ')
    .filter(Boolean)
}
