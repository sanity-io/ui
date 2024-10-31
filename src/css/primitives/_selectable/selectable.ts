import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'
import {radius} from '../../aspects'
import type {SelectableStyleProps} from './types'

/** @internal */
export function _selectable(props: SelectableStyleProps): string | undefined {
  return _composeClassNames(_scopeClassNames('selectable', props.tone ?? 'default'), radius(props))
}
