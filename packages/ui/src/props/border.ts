import {type StyleProp} from '../types/StyleProp'
import {RADIUS, type Radius} from '../types/Radius'
import {type Responsive} from '../types/Responsive'

export type BorderProps = {
  /** CSS **border** property */
  border?: Responsive<boolean>
  /** CSS **border-top** property */
  borderTop?: Responsive<boolean>
  /** CSS **border-right** property */
  borderRight?: Responsive<boolean>
  /** CSS **border-bottom** property */
  borderBottom?: Responsive<boolean>
  /** CSS **border-left** property */
  borderLeft?: Responsive<boolean>
  /** CSS **border-radius** property */
  radius?: Responsive<Radius>
}

export const borderProps: Record<string, StyleProp> = {
  border: {
    type: 'boolean',
    className: 'border',
    inverse: 'border-none',
  },
  borderTop: {
    type: 'boolean',
    className: 'border-top',
    inverse: 'border-top-none',
  },
  borderRight: {
    type: 'boolean',
    className: 'border-right',
    inverse: 'border-right-none',
  },
  borderBottom: {
    type: 'boolean',
    className: 'border-bottom',
    inverse: 'border-bottom-none',
  },
  borderLeft: {
    type: 'boolean',
    className: 'border-left',
    inverse: 'border-left-none',
  },
  radius: {
    type: 'union',
    className: 'radius',
    values: RADIUS,
  },
}
