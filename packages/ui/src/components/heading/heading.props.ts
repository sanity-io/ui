import {type TypographyProps, typographyProps} from '../../props/typography'
import {HEADING_SIZE, HEADING_TAG, type HeadingSize, type HeadingTag} from '../../types/Heading'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface HeadingProps extends TypographyProps {
  /**
   * Semantic heading element to render.
   * @remarks Always set this explicitly.
   */
  as?: HeadingTag
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
  ...typographyProps,
}
