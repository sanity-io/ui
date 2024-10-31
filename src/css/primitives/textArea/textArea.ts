import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'
import {_input} from '../_input'
import type {TextAreaStyleProps} from './types'

/** @public */
export function textArea(props: TextAreaStyleProps): string | undefined {
  return _composeClassNames(_scopeClassNames('text-area'), _input(props))
}
