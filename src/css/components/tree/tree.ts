import {_composeClassNames} from '../../_composeClassNames'
import {item} from './tree.css'

/** @beta */
export function treeItem(props: {className?: string}) {
  return _composeClassNames(props.className, item)
}
