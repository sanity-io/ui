import {composeClassNames} from '../../composeClassNames'
import {radius} from '../../styles'
import {BadgeStyleProps} from './types'

/** @public */
export function badge(props: BadgeStyleProps): string | undefined {
  return composeClassNames('badge', props.tone && `badge-${props.tone}`, radius(props))
}
