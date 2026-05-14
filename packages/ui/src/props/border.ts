import {type PropDef} from '../types/PropDef'
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

export const borderProps: Record<string, PropDef> = {
  border: {
    type: 'boolean',
    className: 'border',
    inverseClassName: 'border-none',
  },
  borderTop: {
    type: 'boolean',
    className: 'border-top',
    inverseClassName: 'border-top-none',
  },
  borderRight: {
    type: 'boolean',
    className: 'border-right',
    inverseClassName: 'border-right-none',
  },
  borderBottom: {
    type: 'boolean',
    className: 'border-bottom',
    inverseClassName: 'border-bottom-none',
  },
  borderLeft: {
    type: 'boolean',
    className: 'border-left',
    inverseClassName: 'border-left-none',
  },
  radius: {
    type: 'union',
    className: 'radius',
    values: RADIUS,
  },
}
