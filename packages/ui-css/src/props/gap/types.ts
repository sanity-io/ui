import type {Space} from '@sanity/ui-tokens/system'

import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface GapStyleProps {
  gap?: ResponsiveProp<Space>
  gapX?: ResponsiveProp<Space>
  gapY?: ResponsiveProp<Space>
}

/** @internal */
export const GAP_STYLE_PROP_KEYS = ['gap', 'gapX', 'gapY'] as const

// assert exact keys
GAP_STYLE_PROP_KEYS satisfies ExactKeyTuple<GapStyleProps, typeof GAP_STYLE_PROP_KEYS>
