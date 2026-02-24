import {type ExactKeyTuple} from '../../_keys'

/** @public */
export type BoxSizing = 'content' | 'border'

/** @public */
export interface BoxSizingStyleProps {
  boxSizing?: BoxSizing
}

/** @internal */
export const BOX_SIZING_STYLE_PROP_KEYS = ['boxSizing'] as const

// assert exact keys
BOX_SIZING_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  BoxSizingStyleProps,
  typeof BOX_SIZING_STYLE_PROP_KEYS
>
