import {_composeClassNames} from '../../_composeClassNames'
import {input, presentation, root} from './checkbox.css'

/** @public */
export function checkbox(props: {className?: string}) {
  return _composeClassNames(props.className, root)
}

/** @public */
export function checkboxInput() {
  return input
}

/** @public */
export function checkboxPresentation() {
  return presentation
}
