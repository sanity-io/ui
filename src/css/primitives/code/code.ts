import {_composeClassNames} from '../../_composeClassNames'
import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import {font} from '../../aspects'
import type {CodeStyleProps} from './types'

/** @public */
export function code(props: CodeStyleProps): string | undefined {
  return _composeClassNames(
    _scopeClassNames('code', 'block', _resp(`code`, props.size)),
    font(props),
  )
}
