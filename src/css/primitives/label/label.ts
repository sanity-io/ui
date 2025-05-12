import {_comp} from '../../_comp'
import {_resp} from '../../_resp'
import {font} from '../../aspects'
import {LabelStyleProps} from './types'

/** @public */
export function label(props: LabelStyleProps): string | undefined {
  return _comp(
    'label',
    'block',
    font(props),
    props.accent && 'label-accent',
    props.muted && 'label-muted',
    _resp(`label`, props.size),
  )
}
