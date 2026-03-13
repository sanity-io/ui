import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {item, root} from './tree.css'

/** @beta */
export function tree(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, root)
}

/** @beta */
export function tree_item(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, item)
}
