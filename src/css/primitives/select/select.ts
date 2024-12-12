import {composeClassNames} from '../../composeClassNames'
import {_input, _inputPresentation} from '../_input'
import {SelectStyleProps} from './types'

export function select(props: SelectStyleProps): string | undefined {
  return composeClassNames('select', _input(props))
}

export function selectPresentation(): string | undefined {
  return composeClassNames('select-presentation', _inputPresentation())
}
