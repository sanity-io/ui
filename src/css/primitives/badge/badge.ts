import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'
import {radius} from '../../aspects'
import type {BadgeStyleProps} from './types'

/** @public */
export function badge(props: BadgeStyleProps): string | undefined {
  return _composeClassNames(
    _scopeClassNames('badge', props.tone && `badge-${props.tone}`),
    radius(props),
  )
}
