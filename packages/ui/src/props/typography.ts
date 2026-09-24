import {FONT_WEIGHT, type FontWeight} from '../types/FontWeight'
import {type PropDef} from '../types/PropDef'
import type {Responsive} from '../types/Responsive'
import {TEXT_ALIGN, type TextAlign} from '../types/TextAlign'
import {type MarginProps, marginProps} from './margin'
import {type ToneProps, toneProps} from './tone'

/** @public */
export interface TypographyProps extends MarginProps, ToneProps {
  /** CSS **text-align** property */
  align?: Responsive<TextAlign>
  /** CSS **color** property */
  muted?: boolean
  /** CSS **text-box-trim** property */
  trim?: boolean
  /** Number of lines to truncate */
  truncate?: Responsive<number>
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
    inverseClassName: 'text-default',
  },
  trim: {
    type: 'boolean',
    className: 'text-trim',
    inverseClassName: 'text-trim-none',
  },
  truncate: {
    type: 'conditional',
    resolve: (value) => {
      if (value === 1) {
        return {
          type: 'number',
          className: 'text-overflow',
        }
      } else {
        return {
          type: 'number',
          className: 'line-clamp',
          variable: '--line-clamp',
        }
      }
    },
  },
  weight: {
    type: 'union',
    className: 'weight',
    values: FONT_WEIGHT,
  },
  ...marginProps,
  ...toneProps,
}
