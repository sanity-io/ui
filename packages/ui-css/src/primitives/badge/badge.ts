import {_composeClassNames} from '../../_composeClassNames'
import {root, tones} from './badge.css'
import type {BadgeStyleProps} from './types'

/** @public */
export function badge(props: BadgeStyleProps): string | undefined {
  return _composeClassNames(props.className, root, tones[props.tone ?? 'default'])
}
