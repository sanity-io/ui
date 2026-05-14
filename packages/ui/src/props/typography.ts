import {FONT_WEIGHT, type FontWeight} from '../types/FontWeight'
import {type PropDef} from '../types/PropDef'
import {TEXT_ALIGN, type TextAlign} from '../types/TextAlign'
import {type MarginProps, marginProps} from './margin'
import {type ToneProps, toneProps} from './tone'

export interface TypographyProps extends MarginProps, ToneProps {
  /** CSS **text-align** property */
  align?: TextAlign
  /** CSS **-webkit-line-clamp** property */
  lineClamp?: number
  /** CSS **color** property */
  muted?: boolean
  /** CSS **text-box-trim** property */
  trim?: boolean
  /** CSS **font-weight** property */
  weight?: FontWeight
}

export const typographyProps: Record<string, PropDef> = {
  align: {
    type: 'union',
    className: 'text',
    values: TEXT_ALIGN,
  },
  lineClamp: {
    type: 'number',
    className: 'line-clamp',
    variable: '--line-clamp',
  },
  muted: {
    type: 'boolean',
    className: 'text-muted',
    inverseClassName: 'text-default',
  },
  trim: {
    type: 'boolean',
    className: 'text-trim',
    inverseClassName: 'text-trim-none',
  },
  weight: {
    type: 'union',
    className: 'weight',
    values: FONT_WEIGHT,
  },
  ...marginProps,
  ...toneProps,
}
