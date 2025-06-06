import {_composeClassNames} from '../../_composeClassNames'
import {root} from './stack.css'

/** @public */
export function stack(props: {className?: string}) {
  return _composeClassNames(props.className, root)
}
