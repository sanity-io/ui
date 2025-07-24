import {_composeClassNames} from '../../_composeClassNames'
import {root} from './srOnly.css'

/** @public */
export function srOnly(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, root)
}
