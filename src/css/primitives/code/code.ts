import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {font} from '../../styles/font'
import {CodeStyleProps} from './types'

/** @public */
export function code(props: CodeStyleProps): string {
  return composeClassNames('code', 'block', font(props), _resp(`code`, props.size))
}
