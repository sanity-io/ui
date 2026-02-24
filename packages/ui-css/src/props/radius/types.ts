import type {Radius} from '@sanity/ui-tokens/system'

import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface RadiusStyleProps {
  radius?: ResponsiveProp<Radius>
}

/** @internal */
export const RADIUS_STYLE_PROP_KEYS = ['radius'] as const

// assert exact keys
RADIUS_STYLE_PROP_KEYS satisfies ExactKeyTuple<RadiusStyleProps, typeof RADIUS_STYLE_PROP_KEYS>
