export function getElementMatchNames(element: string, localNames?: Iterable<string>): Set<string> {
  if (localNames === undefined) {
    return new Set([element])
  }

  return new Set(localNames)
}
