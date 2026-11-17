import {marginProps, type MarginProps} from '../../props/margin'
import {toneProps, type ToneProps} from '../../props/tone'
import {type TypographyProps, typographyProps} from '../../props/typography'
import {HEADING_SIZE, HEADING_TAG, type HeadingSize, type HeadingTag} from '../../types/Heading'
import type {Polymorphic} from '../../types/Polymorphic'
import type {PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export type HeadingProps<T extends HeadingTag = 'h2'> = Polymorphic<
  T,
  MarginProps &
    ToneProps &
    Omit<TypographyProps, 'muted' | 'weight'> & {
      /**
       * Semantic heading element to render.
       */
      as: T
      /**
       * Sets font size.
       * @remarks Independent of `as`.
       */
      size?: Responsive<HeadingSize>
    }
>

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
  truncate: typographyProps['truncate'] as PropDef,
  ...marginProps,
  ...toneProps,
}
