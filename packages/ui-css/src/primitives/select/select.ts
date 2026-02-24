import {_composeClassNames} from '../../_composeClassNames'
import {_input, _inputPresentation} from '../_input/input'
import {presentation, root} from './select.css'
import type {SelectStyleProps} from './types'

/** @public */
export function select(props: SelectStyleProps): string | undefined {
  return _composeClassNames(root, _input(props))
}

/** @public */
export function selectPresentation(): string | undefined {
  return _composeClassNames(presentation, _inputPresentation())
}
