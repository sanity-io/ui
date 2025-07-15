import {_composeClassNames} from '../../_composeClassNames'
import {item} from './tree.css'

/** @beta */
export function treeItem(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, item)
}
