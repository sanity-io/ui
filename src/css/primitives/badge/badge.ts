import {_comp} from '../../_comp'
import {radius} from '../../aspects'
import {BadgeStyleProps} from './types'

/** @public */
export function badge(props: BadgeStyleProps): string | undefined {
  return _comp('badge', props.tone && `badge-${props.tone}`, radius(props))
}
