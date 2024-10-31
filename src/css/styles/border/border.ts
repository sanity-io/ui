import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {BorderStyleProps} from './types'

const prefixes = {
  border: 'border',
  borderTop: 'border-t',
  borderRight: 'border-r',
  borderBottom: 'border-b',
  borderLeft: 'border-l',
}

/** @public */
export function border(props: BorderStyleProps): string | undefined {
  return composeClassNames(
    _resp(prefixes.border, props.border),
    _resp(prefixes.borderTop, props.borderTop),
    _resp(prefixes.borderRight, props.borderRight),
    _resp(prefixes.borderBottom, props.borderBottom),
    _resp(prefixes.borderLeft, props.borderLeft),
  )
}
