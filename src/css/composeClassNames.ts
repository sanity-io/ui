export function composeClassNames(
  ...classNames: Array<string | false | undefined>
): string | undefined {
  return classNames.filter(Boolean).join(' ') || undefined
}
