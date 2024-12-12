// import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {_input} from '../_input'
import {TextInputStyleProps} from './types'

export function textInput(props: TextInputStyleProps): string | undefined {
  return composeClassNames(_input(props), 'text-input')
}
