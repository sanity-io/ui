import {_composeClassNames} from '../../_composeClassNames'
import {input, presentation, root} from './checkbox.css'

/** @public */
export function checkbox(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, root)
}

/** @public */
export function checkboxInput(): string {
  return input
}

/** @public */
export function checkboxPresentation(): string {
  return presentation
}
