import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {font} from '../../styles/font'
import {LabelStyleProps} from './types'

/** @public */
export function label(props: LabelStyleProps): string {
  return composeClassNames(
    'label',
    'block',
    font(props),
    props.accent && 'label-accent',
    props.muted && 'label-muted',
    _resp(`label`, props.size),
  )
}
