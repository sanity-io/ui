import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {font} from '../../styles'
import {CodeStyleProps} from './types'

/** @public */
export function code(props: CodeStyleProps): string | undefined {
  return composeClassNames('code', 'block', font(props), _resp(`code`, props.size))
}
