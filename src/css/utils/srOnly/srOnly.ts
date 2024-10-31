import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'

/** @public */
export function srOnly(): string | undefined {
  return _scopeClassNames(_composeClassNames('sr-only'))
}
