import {_composeClassNames} from '../../_composeClassNames'
import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import {font, textAlign} from '../../aspects'
import type {LabelStyleProps} from './types'

/** @public */
export function label(props: LabelStyleProps): string | undefined {
  return _composeClassNames(
    _scopeClassNames('label', 'block', props.muted && 'label-muted', _resp(`label`, props.size)),
    font(props),
    textAlign({textAlign: props.align}),
  )
}
