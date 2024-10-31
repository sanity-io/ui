import {_getClassNames} from './composeClassNames'
import {scopeClassName} from './scopeClassName'

export function _comp(...classNames: Array<string | false | undefined>): string | undefined {
  return (
    _getClassNames(...classNames)
      .filter(Boolean)
      .map(scopeClassName)
      .join(' ') || undefined
  )
}
