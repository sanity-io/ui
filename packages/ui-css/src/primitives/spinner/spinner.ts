import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {root, spinnerIcon} from './spinner.css'
import type {SpinnerStyleProps} from './types'

/** @public */
export function spinner(props: SpinnerStyleProps): string | undefined {
  return _composeClassNames(props.className, root)
}

/** @public */
export function spinner_animatedIcon(): string {
  return spinnerIcon
}
