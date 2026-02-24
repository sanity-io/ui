import {type ExactKeyTuple} from '../../_keys'

/** @public */
export type TextOverflow = 'ellipsis' | 'clip'

/** @public */
export interface TextOverflowStyleProps {
  /**
   * Controls how overflowing text is treated.
   * Use `textOverflow="ellipsis"` to render text as a single line which is concatenated with a `…` symbol.
   * @beta
   */
  textOverflow?: TextOverflow
}

/** @internal */
export const TEXT_OVERFLOW_STYLE_PROP_KEYS = ['textOverflow'] as const

// assert exact keys
TEXT_OVERFLOW_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  TextOverflowStyleProps,
  typeof TEXT_OVERFLOW_STYLE_PROP_KEYS
>
