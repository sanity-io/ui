import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'
import {_input, _inputPresentation} from '../_input'
import type {SelectStyleProps} from './types'

/** @public */
export function select(props: SelectStyleProps): string | undefined {
  return _composeClassNames(_scopeClassNames('select'), _input(props))
}

/** @public */
export function selectPresentation(): string | undefined {
  return _composeClassNames(_scopeClassNames('select-presentation'), _inputPresentation())
}
