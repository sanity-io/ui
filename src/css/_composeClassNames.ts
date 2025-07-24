import {_getClassNames} from './_getClassNames'

/** @internal */
export function _composeClassNames(
  ...classNames: Array<string | false | undefined>
): string | undefined {
  return unique(_getClassNames(...classNames)).join(' ') || undefined
}

function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}
