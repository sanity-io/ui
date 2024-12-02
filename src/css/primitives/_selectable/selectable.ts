import {composeClassNames} from '../../composeClassNames'
import {radius} from '../../styles/radius'
import {SelectableStyleProps} from './types'

/** @internal */
export function _selectable(props: SelectableStyleProps): string {
  const {tone = 'default'} = props

  return composeClassNames('selectable', `selectable-tone-${tone}`, radius(props))
}
