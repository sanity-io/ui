import {_getClassNames} from './_getClassNames'
import {_scopeClassName} from './_scopeClassName'

export function _scopeClassNames(
  ...classNames: Array<string | false | undefined>
): string | undefined {
  return (
    _getClassNames(...classNames)
      .map(_scopeClassName)
      .join(' ') || undefined
  )
}
