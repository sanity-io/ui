// import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {_input} from '../_input'
import {TextInputStyleProps} from './types'

export function textInput(props: TextInputStyleProps): string {
  return composeClassNames(
    'text-input',
    _input(props),
    // _resp('text-input', props.fontSize),
    // _resp('text-input-p', props.padding),
  )
}

export function textInputElement(): string {
  return composeClassNames('text-input-element')
}
