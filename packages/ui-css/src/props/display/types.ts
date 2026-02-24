import type {ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type Display =
  | 'block'
  | 'inline-block'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'none'

/** @public */
export interface DisplayStyleProps {
  display?: ResponsiveProp<Display>
}

/** @internal */
export const DISPLAY_STYLE_PROP_KEYS = ['display'] as const

// assert exact keys
DISPLAY_STYLE_PROP_KEYS satisfies ExactKeyTuple<DisplayStyleProps, typeof DISPLAY_STYLE_PROP_KEYS>
