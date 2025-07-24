import {_composeClassNames} from '../../_composeClassNames'
import {_input} from '../_input/input'
import {root} from './textArea.css'
import type {TextAreaStyleProps} from './types'

/** @public */
export function textArea(props: TextAreaStyleProps): string | undefined {
  return _composeClassNames(props.className, root, _input(props))
}
