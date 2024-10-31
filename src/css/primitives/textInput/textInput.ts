import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'
import {_input} from '../_input'
import type {TextInputStyleProps} from './types'

/** @public */
export function textInput(props: TextInputStyleProps): string | undefined {
  return _composeClassNames(_scopeClassNames('text-input'), _input(props))
}

/** @public */
export function textInputPrefix(): string | undefined {
  return _scopeClassNames('text-input-prefix')
}

/** @public */
export function textInputElement(): string | undefined {
  return _scopeClassNames('text-input-element')
}

/** @public */
export function textInputSuffix(): string | undefined {
  return _scopeClassNames('text-input-suffix')
}
