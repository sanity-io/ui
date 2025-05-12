import {_comp} from '../../_comp'
import {composeClassNames} from '../../composeClassNames'
import {_input} from '../_input'
import {TextInputStyleProps} from './types'

export function textInput(props: TextInputStyleProps): string | undefined {
  return composeClassNames(_input(props), _comp('text-input'))
}
