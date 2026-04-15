import { FONT_WEIGHT, type FontWeight } from '../types/FontWeight'
import {type PropDef} from '../types/PropDef'
import { TEXT_ALIGN, type TextAlign } from '../types/TextAlign'
import {type MarginProps, marginProps} from './margin'


export interface TypographyProps
  extends
    MarginProps {
      /** CSS **text-align** property */
      align?: TextAlign
      /** CSS **color** property */
      muted?: boolean
      /** CSS **overlow** property */
      textOverflow?: boolean
      /** CSS **font-weight** property */
      weight?: FontWeight
    }

export const typographyProps: Record<string, PropDef> = {
  align: {
    type: 'union',
    className: 'text-align',
    values: TEXT_ALIGN,
  },
  muted: {
    type: 'boolean',
    className: 'text-muted',
    inverse: 'text-default',
  },
  textOverflow: {
    type: 'boolean',
    className: 'text-overflow',
    inverse: 'text-wrap',
  },
  weight: {
    type: 'union',
    className: 'font-weight',
    values: FONT_WEIGHT,
  },
  ...marginProps,
}
