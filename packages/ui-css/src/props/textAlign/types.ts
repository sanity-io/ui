import {type ExactKeyTuple} from '../../lib/props/_keys'

/** @public */
export type TextAlign = 'left' | 'right' | 'center' | 'justify' // | 'initial'

/** @public */
export interface TextAlignStyleProps {
  textAlign?: TextAlign
}

/** @internal */
export const TEXT_ALIGN_STYLE_PROP_KEYS = ['textAlign'] as const

// assert exact keys
TEXT_ALIGN_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  TextAlignStyleProps,
  typeof TEXT_ALIGN_STYLE_PROP_KEYS
>
