import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {TextInputStyleProps} from './types'

export function textInput(props: TextInputStyleProps): string {
  return composeClassNames(
    'text-input',
    _resp('text-input', props.size),
    _resp('text-input-p', props.padding),
  )
}

export function textInputElement(): string {
  return composeClassNames('text-input-element')
}
