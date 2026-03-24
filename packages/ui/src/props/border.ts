import { type PropDef } from "../types/PropDef";
import { type Responsive } from "../types/Responsive";

export type BorderProps = {
  border?: Responsive<boolean>
  borderTop?: Responsive<boolean>
  borderRight?: Responsive<boolean>
  borderBottom?: Responsive<boolean>
  borderLeft?: Responsive<boolean>  
}

export const borderProps: Record<string, PropDef> = {
  border: {
    type: 'boolean',
    className: 'border',
    inverseClassName: 'border-none'
  },
  borderTop: {
    type: 'boolean',
    className: 'border-top',
    inverseClassName: 'border-top-none'
  },
  borderRight: {
    type: 'boolean',
    className: 'border-right',
    inverseClassName: 'border-right-none'
  },
  borderBottom: {
    type: 'boolean',
    className: 'border-bottom',
    inverseClassName: 'border-bottom-none'
  },
  borderLeft: {
    type: 'boolean',
    className: 'border-left',
    inverseClassName: 'border-left-none'
  },
}
