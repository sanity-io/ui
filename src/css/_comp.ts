import {getClassNames} from './composeClassNames'
import {scopeClassName} from './scopeClassName'

export function _comp(...classNames: Array<string | false | undefined>): string | undefined {
  return (
    getClassNames(...classNames)
      .map(scopeClassName)
      .join(' ') || undefined
  )
}
