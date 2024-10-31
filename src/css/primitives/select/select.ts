import {_comp} from '../../_comp'
import {composeClassNames} from '../../composeClassNames'
import {_input, _inputPresentation} from '../_input'
import {SelectStyleProps} from './types'

/** @public */
export function select(props: SelectStyleProps): string | undefined {
  return composeClassNames(_comp('select'), _input(props))
}

/** @public */
export function selectPresentation(): string | undefined {
  return composeClassNames(_comp('select-presentation'), _inputPresentation())
}
