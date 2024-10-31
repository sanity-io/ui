import {composeClassNames} from '../../composeClassNames'
import {radius} from '../../styles/radius'
import {BadgeStyleProps} from './types'

/** @public */
export function badge(props: BadgeStyleProps): string {
  return composeClassNames('badge', props.tone && `badge-${props.tone}`, radius(props))
}
