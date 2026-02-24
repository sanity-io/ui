import {_composeClassNames} from '../../_composeClassNames'
import {panel} from './tab.css'

/** @public */
export function tab_panel(props: {className?: string}) {
  return _composeClassNames(props.className, panel)
}
