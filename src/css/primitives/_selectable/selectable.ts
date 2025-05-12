import {_comp} from '../../_comp'
import {radius} from '../../aspects'
import {toneMap} from './_contants'
import {SelectableStyleProps} from './types'

/** @internal */
export function _selectable(props: SelectableStyleProps): string | undefined {
  return _comp('selectable', toneMap[props.tone ?? 'default'], radius(props))
}
