import { type PropDef } from "../types/PropDef";
import { type Responsive } from "../types/Responsive";

export type GridChildProps = {
  gridColumn?: Responsive<string>
  gridColumnStart?: Responsive<string>
  gridColumnEnd?: Responsive<string>
  gridRow?: Responsive<string>
  gridRowStart?: Responsive<string>
  gridRowEnd?: Responsive<string>
}

export const gridChildProps: Record<string, PropDef> = {
  gridColumn: {
    type: 'string',
    className: 'grid-col',
    variable: '--grid-col',
  },
  gridColumnStart: {
    type: 'string',
    className: 'grid-col-start',
    variable: '--grid-col-start',
  },
  gridColumnEnd: {
    type: 'string',
    className: 'grid-col-end',
    variable: '--grid-col-end',
  },
  gridRow: {
    type: 'string',
    className: 'grid-row',
    variable: '--grid-row',
  },
  gridRowStart: {
    type: 'string',
    className: 'grid-row-start',
    variable: '--grid-row-start',
  },
  gridRowEnd: {
    type: 'string',
    className: 'grid-row-end',
    variable: '--grid-row-end',
  },
}
