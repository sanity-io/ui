import {marginProps, type MarginProps} from '../../props/margin'
import {toneProps, type ToneProps} from '../../props/tone'
import {type TypographyProps, typographyProps} from '../../props/typography'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'
import {TEXT_SIZE, type TextSize} from '../../types/Text'

/** @public */
export interface TextProps<T extends React.ElementType = 'span'>
  extends MarginProps, ToneProps, TypographyProps {
  /**
   * HTML element to render.
   */
  as?: T
  /**
   * Sets font size.
   */
  size?: Responsive<TextSize>
}

export const textProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  size: {
    type: 'union',
    className: 'text-body',
    values: TEXT_SIZE,
  },
  ...marginProps,
  ...toneProps,
  ...typographyProps,
}
