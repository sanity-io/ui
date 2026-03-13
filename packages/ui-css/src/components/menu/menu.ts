import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {divider, root} from './menu.css'

/** @public */
export function menu(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, root)
}

/** @public */
export function menu_divider(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, divider)
}
