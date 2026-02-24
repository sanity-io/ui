import {type ExactKeyTuple} from '../../_keys'

/** @public */
export type Outline = 'none'

/** @public */
export interface OutlineStyleProps {
  outline?: Outline
}

/** @internal */
export const OUTLINE_STYLE_PROP_KEYS = ['outline'] as const

// assert exact keys
OUTLINE_STYLE_PROP_KEYS satisfies ExactKeyTuple<OutlineStyleProps, typeof OUTLINE_STYLE_PROP_KEYS>
