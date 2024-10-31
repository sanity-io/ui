import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'
import {radius} from '../../aspects'
import type {KBDStyleProps} from './types'

/** @public */
export function kbd(props: KBDStyleProps): string | undefined {
  return _composeClassNames(_scopeClassNames('kbd'), radius(props))
}
