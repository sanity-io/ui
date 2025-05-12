import {_comp} from '../../_comp'
import {_resp} from '../../_resp'
import {font} from '../../aspects'
import {CodeStyleProps} from './types'

/** @public */
export function code(props: CodeStyleProps): string | undefined {
  return _comp('code', 'block', font(props), _resp(`code`, props.size))
}
