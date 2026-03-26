import { type PropDef } from "../types/PropDef";
import { type Radius, RADIUS } from "../types/Radius";
import { type Responsive } from "../types/Responsive";

export type BorderProps = {
  border?: Responsive<boolean>
  borderTop?: Responsive<boolean>
  borderRight?: Responsive<boolean>
  borderBottom?: Responsive<boolean>
  borderLeft?: Responsive<boolean>
  radius?: Responsive<Radius>
}

export const borderProps: Record<string, PropDef> = {
  border: {
    type: 'boolean',
    className: 'border',
    inverse: 'border-none'
  },
  borderTop: {
    type: 'boolean',
    className: 'border-top',
    inverse: 'border-top-none'
  },
  borderRight: {
    type: 'boolean',
    className: 'border-right',
    inverse: 'border-right-none'
  },
  borderBottom: {
    type: 'boolean',
    className: 'border-bottom',
    inverse: 'border-bottom-none'
  },
  borderLeft: {
    type: 'boolean',
    className: 'border-left',
    inverse: 'border-left-none'
  },
  radius: {
    type: 'union',
    className: 'radius',
    values: RADIUS
  }
}
