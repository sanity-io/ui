import {_composeClassNames} from '../../_composeClassNames'
import {display} from '../../props/display/display'
import {_input, _input_element, _input_presentation} from '../_input/_input'
import {root} from './textArea.css'
import type {TextAreaStyleProps} from './types'

/** @public */
export function textArea(props: TextAreaStyleProps): string | undefined {
  return _composeClassNames(props.className, root, _input(props), display({display: 'flex'}))
}

/** @public */
export function textArea_element(): string | undefined {
  return _input_element()
}

/** @public */
export function textArea_presentation(): string | undefined {
  return _input_presentation()
}
