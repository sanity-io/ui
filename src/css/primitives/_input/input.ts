import {_composeClassNames} from '../../_composeClassNames'
import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import {radius, width} from '../../aspects'
import type {InputStyleProps} from './types'

/** @internal */
export function _input(props: InputStyleProps): string | undefined {
  return _composeClassNames(
    _scopeClassNames(
      'input',
      props.border ? 'input-b' : undefined,
      _resp('input', props.fontSize),
      _resp('input-p', props.padding),
      _resp('input-g', props.gap),
    ),
    radius(props),
    width(props),
  )
}

/** @internal */
export function _inputElement(): string | undefined {
  return _scopeClassNames('input-element')
}

/** @internal */
export function _inputPresentation(): string | undefined {
  return _scopeClassNames('input-presentation')
}
