import {marginProps} from '../../props/margin'
import {toneProps} from '../../props/tone'
import {type TypographyProps, typographyProps} from '../../props/typography'
import {HEADING_SIZE, HEADING_TAG, type HeadingSize, type HeadingTag} from '../../types/Heading'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface HeadingProps extends Omit<TypographyProps, 'muted' | 'weight'> {
  /**
   * Semantic heading element to render.
   */
  as: HeadingTag
  /**
   * Sets font size.
   * @remarks Independent of `as`.
   */
  size?: Responsive<HeadingSize>
}

export const headingProps: Record<string, PropDef> = {
  as: {
    type: 'union',
    values: HEADING_TAG,
  },
  size: {
    type: 'union',
    className: 'text-heading',
    values: HEADING_SIZE,
  },
  align: typographyProps['align'] as PropDef,
  trim: typographyProps['trim'] as PropDef,
  truncate: typographyProps['truncated'] as PropDef,
  ...marginProps,
  ...toneProps,
}
