import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {radius} from '../../styles/radius'
import {InputStyleProps} from './types'

/** @internal */
export function _input(props: InputStyleProps): string {
  return composeClassNames(
    `_input`,
    _resp(`_input`, props.fontSize),
    _resp(`_input-p`, props.padding),
    _resp(`_input-space`, props.space),
    props.border && `_input-border`,
    radius(props),
  )
}
