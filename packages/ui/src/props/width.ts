import { type PropDef } from "../types/PropDef";
import { type Responsive } from "../types/Responsive";
 
export type WidthProps = {
  width?: Responsive<string>
  minWidth?: Responsive<string>
  maxWidth?: Responsive<string>
}

export const widthProps: Record<string, PropDef> = {
  width: {
    type: 'string',
    className: 'width',
    variable: '--width',
  },
  minWidth: {
    type: 'string',
    className: 'min-width',
    variable: '--min-width',
  },
  maxWidth: {
    type: 'string',
    className: 'max-width',
    variable: '--max-width',
  },
}
