import {_composeClassNames} from '../../_composeClassNames'
import {_input} from '../_input/input'
import {element, prefix, root, suffix} from './textInput.css'
import type {TextInputStyleProps} from './types'

/** @public */
export function textInput(props: TextInputStyleProps): string | undefined {
  return _composeClassNames(props.className, root, _input(props))
}

/** @public */
export function textInputPrefix(): string | undefined {
  return prefix
}

/** @public */
export function textInputElement(): string | undefined {
  return element
}

/** @public */
export function textInputSuffix(): string | undefined {
  return suffix
}
