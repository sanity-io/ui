import {composeClassNames} from '../../composeClassNames'
import {radius} from '../../styles/radius'
import {SelectableStyleProps} from './types'

export function selectable(props: SelectableStyleProps): string {
  const {tone = 'default'} = props

  return composeClassNames('selectable', `selectable-tone-${tone}`, radius(props))
}
