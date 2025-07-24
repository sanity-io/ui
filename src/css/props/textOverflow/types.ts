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
