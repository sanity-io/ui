import {_comp} from '../../_comp'
import {_resp} from '../../_resp'
import {radius, width} from '../../aspects'
import {InputStyleProps} from './types'

/** @internal */
export function _input(props: InputStyleProps): string | undefined {
  return _comp(
    'input',
    props.border ? 'input-b' : undefined,
    _resp('input', props.fontSize),
    _resp('input-p', props.padding),
    _resp('input-g', props.gap),
    radius(props),
    width(props),
  )
}

export function _inputElement(): string | undefined {
  return _comp('input-element')
}

export function _inputPresentation(): string | undefined {
  return _comp('input-presentation')
}
