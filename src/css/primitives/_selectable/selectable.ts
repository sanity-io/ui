import {composeClassNames} from '../../composeClassNames'
import {radius} from '../../styles'
import {toneMap} from './_contants'
import {SelectableStyleProps} from './types'

/** @internal */
export function _selectable(props: SelectableStyleProps): string | undefined {
  return composeClassNames('selectable', toneMap[props.tone ?? 'default'], radius(props))
}
