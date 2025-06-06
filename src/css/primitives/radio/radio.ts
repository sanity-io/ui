import {_composeClassNames} from '../../_composeClassNames'
import {input, presentation, root} from './radio.css'

/** @public */
export function radio(props: {className?: string}) {
  return _composeClassNames(props.className, root)
}

/** @public */
export function radioInput() {
  return input
}

/** @public */
export function radioPresentation() {
  return presentation
}
