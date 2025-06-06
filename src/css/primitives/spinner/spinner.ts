import {_composeClassNames} from '../../_composeClassNames'
import {root, spinnerIcon} from './spinner.css'
import type {SpinnerStyleProps} from './types'

/** @public */
export function spinner(props: SpinnerStyleProps) {
  return _composeClassNames(props.className, root)
}

/** @public */
export function animatedSpinnerIcon() {
  return spinnerIcon
}
