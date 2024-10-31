export function composeClassNames(...classNames: Array<string | false | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}
