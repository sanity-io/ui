import {_composeClassNames} from '../../_composeClassNames'
import {root, sprinkles} from './badge.css'
import type {BadgeStyleProps} from './types'

/** @public */
export function badge(props: BadgeStyleProps): string | undefined {
  const tone = props.tone ?? 'default'
  return _composeClassNames(props.className, root, sprinkles({tone}))
}
