import {marginProps, type MarginProps} from '../../props/margin'
import {toneProps, type ToneProps} from '../../props/tone'
import {type TypographyProps, typographyProps} from '../../props/typography'
import {EYEBROW_SIZE, type EyebrowSize} from '../../types/Eyebrow'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface EyebrowProps<T extends React.ElementType = 'span'>
  extends MarginProps, ToneProps, Omit<TypographyProps, 'weight'> {
  /**
   * HTML element to render.
   */
  as?: T
  /**
   * Sets font size. Uses the same scale as Label.
   */
  size?: Responsive<EyebrowSize>
}

export const eyebrowProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  size: {
    type: 'union',
    className: 'text-eyebrow',
    values: EYEBROW_SIZE,
  },
  muted: typographyProps['muted'] as PropDef,
  align: typographyProps['align'] as PropDef,
  trim: typographyProps['trim'] as PropDef,
  truncate: typographyProps['truncate'] as PropDef,
  ...marginProps,
  ...toneProps,
}
