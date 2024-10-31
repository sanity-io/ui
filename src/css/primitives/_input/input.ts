import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {radius, width} from '../../styles'
import {InputStyleProps} from './types'

/** @internal */
export function _input(props: InputStyleProps): string | undefined {
  return composeClassNames(
    `input`,
    _resp(`input`, props.fontSize),
    props.border && `input-b`,
    _resp(`input-p`, props.padding),
    _resp(`input-g`, props.gap),
    radius(props),
    width(props),
  )
}

export function _inputElement(): string {
  return 'input-element'
}

export function _inputPresentation(): string {
  return 'input-presentation'
}
