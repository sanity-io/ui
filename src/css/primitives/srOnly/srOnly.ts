import {_composeClassNames} from '../../_composeClassNames'
import {root} from './srOnly.css'

/** @public */
export function srOnly(props: {className?: string}) {
  return _composeClassNames(props.className, root)
}
