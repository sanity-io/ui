import {composeClassNames} from '../../composeClassNames'
import {_input} from '../_input'
import {SelectStyleProps} from './types'

export function select(props: SelectStyleProps): string {
  return composeClassNames('select', _input(props))
}
