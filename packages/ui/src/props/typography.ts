import {FONT_WEIGHT, type FontWeight} from '../types/FontWeight'
import {type PropDef} from '../types/PropDef'
import {TEXT_ALIGN, type TextAlign} from '../types/TextAlign'
import {TEXT_OVERFLOW, type TextOverflow} from '../types/TextOverflow'
import {type MarginProps, marginProps} from './margin'

export interface TypographyProps extends MarginProps {
  /** CSS **text-align** property */
  align?: TextAlign
  /** CSS **color** property */
  muted?: boolean
  /** CSS **overlow** property */
  textOverflow?: TextOverflow
  /** CSS **font-weight** property */
  weight?: FontWeight
}

export const typographyProps: Record<string, PropDef> = {
  align: {
    type: 'union',
    className: 'text',
    values: TEXT_ALIGN,
  },
  muted: {
    type: 'boolean',
    className: 'text-muted',
    inverse: 'text-default',
  },
  textOverflow: {
    type: 'union',
    className: 'text',
    values: TEXT_OVERFLOW,
  },
  weight: {
    type: 'union',
    className: 'weight',
    values: FONT_WEIGHT,
  },
  ...marginProps,
}
