import {_composeClassNames} from '../../_composeClassNames'
import {root} from './stack.css'

/** @public */
export function stack(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, root)
}
