import type {Shadow} from '@sanity/ui-tokens'

import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface ShadowStyleProps {
  shadow?: ResponsiveProp<Shadow>
}

/** @internal */
export const SHADOW_STYLE_PROP_KEYS = ['shadow'] as const

// assert exact keys
SHADOW_STYLE_PROP_KEYS satisfies ExactKeyTuple<ShadowStyleProps, typeof SHADOW_STYLE_PROP_KEYS>
