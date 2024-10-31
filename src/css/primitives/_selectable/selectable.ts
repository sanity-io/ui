import {_comp} from '../../_comp'
import {radius} from '../../aspects'
import {SelectableStyleProps} from './types'

/** @internal */
export function _selectable(props: SelectableStyleProps): string | undefined {
  return _comp('selectable', props.tone ?? 'default', radius(props))
}
