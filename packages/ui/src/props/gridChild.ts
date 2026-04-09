import {type PropDef} from '../types/PropDef'
import {type Responsive} from '../types/Responsive'

export type GridChildProps = {
  /** CSS **grid-column** property */
  gridColumn?: Responsive<string>
  /** CSS **grid-column-start** property */
  gridColumnStart?: Responsive<string>
  /** CSS **grid-column-end** property */
  gridColumnEnd?: Responsive<string>
  /** CSS **grid-row** property */
  gridRow?: Responsive<string>
  /** CSS **grid-row-start** property */
  gridRowStart?: Responsive<string>
  /** CSS **grid-row-end** property */
  gridRowEnd?: Responsive<string>
}

export const gridChildProps: Record<string, PropDef> = {
  gridColumn: {
    type: 'string',
    className: 'grid-column',
    variable: '--grid-column',
  },
  gridColumnStart: {
    type: 'string',
    className: 'grid-column-start',
    variable: '--grid-column-start',
  },
  gridColumnEnd: {
    type: 'string',
    className: 'grid-column-end',
    variable: '--grid-column-end',
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
