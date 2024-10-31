export function composeClassNames(
  ...classNames: Array<string | false | undefined>
): string | undefined {
  const names =
    unique(classNames.map((n) => typeof n === 'string' && n.trim()).filter(Boolean)).join(' ') ||
    undefined

  return names
}

function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}
