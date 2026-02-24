import type {Shadow} from '@sanity/ui-tokens/system'

import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface ShadowStyleProps {
  shadow?: ResponsiveProp<Shadow>
}

/** @internal */
export const SHADOW_STYLE_PROP_KEYS = ['shadow'] as const

// assert exact keys
SHADOW_STYLE_PROP_KEYS satisfies ExactKeyTuple<ShadowStyleProps, typeof SHADOW_STYLE_PROP_KEYS>
