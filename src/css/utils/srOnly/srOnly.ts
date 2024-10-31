import {_comp} from '../../_comp'
import {composeClassNames} from '../../composeClassNames'

/** @public */
export function srOnly(): string | undefined {
  return _comp(composeClassNames('sr-only'))
}
