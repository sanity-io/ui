import { type PropDef } from "../types/PropDef";
import { type Responsive } from "../types/Responsive";

export type HeightProps = {
  height?: Responsive<string>
  minHeight?: Responsive<string>
  maxHeight?: Responsive<string>
}

export const heightProps: Record<string, PropDef> = {
  height: {
    type: 'string',
    className: 'height',
    variable: '--height',
  },
  minHeight: {
    type: 'string',
    className: 'min-height',
    variable: '--min-height',
  },
  maxHeight: {
    type: 'string',
    className: 'max-height',
    variable: '--max-height',
  },
}
