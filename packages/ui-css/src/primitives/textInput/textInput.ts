import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {display} from '../../props/display/display'
import {_input, _input_prefix, _input_presentation, _input_suffix} from '../_input/_input'
import {element, prefix, root, suffix} from './textInput.css'
import type {TextInputStyleProps} from './types'

/** @public */
export function textInput(props: TextInputStyleProps): string | undefined {
  return _composeClassNames(props.className, root, _input(props), display({display: 'flex'}))
}

/** @public */
export function textInput_element(): string | undefined {
  return element
}

/** @public */
export function textInput_presentation(): string | undefined {
  return _input_presentation()
}

/** @public */
export function textInput_prefix(): string | undefined {
  return _composeClassNames(_input_prefix(), prefix)
}

/** @public */
export function textInput_suffix(): string | undefined {
  return _composeClassNames(_input_suffix(), suffix)
}
