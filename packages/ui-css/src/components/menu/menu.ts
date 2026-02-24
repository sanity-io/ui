import {_composeClassNames} from '../../_composeClassNames'
import {divider, root} from './menu.css'

/** @public */
export function menu(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, root)
}

/** @public */
export function menu_divider(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, divider)
}
