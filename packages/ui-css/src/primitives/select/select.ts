import {_composeClassNames} from '../../_composeClassNames'
import {pointerEvents} from '../../props/pointerEvents/pointerEvents'
import {_input, _input_element, _input_presentation} from '../_input/_input'
import {presentation, root} from './select.css'
import type {SelectStyleProps} from './types'

/** @public */
export function select(props: SelectStyleProps): string | undefined {
  return _composeClassNames(root, _input(props))
}

/** @public */
export function select_input(): string | undefined {
  return _composeClassNames(_input_element())
}

/** @public */
export function select_presentation(): string | undefined {
  return _composeClassNames(
    pointerEvents({pointerEvents: 'none'}),
    presentation,
    _input_presentation(),
  )
}
