import {GRID_AUTO_FLOW, type GridAutoFlow} from '../types/Grid'
import {type PropDef} from '../types/PropDef'
import {type Responsive} from '../types/Responsive'

/** @public */
export type GridParentProps = {
  /** CSS **grid-auto-flow** property */
  gridAutoFlow?: Responsive<GridAutoFlow>
  /** CSS **grid-auto-columns** property */
  gridAutoColumns?: Responsive<string>
  /** CSS **grid-auto-row** property */
  gridAutoRows?: Responsive<string>
  /** CSS **grid-template-columns** property */
  gridTemplateColumns?: Responsive<string>
  /** CSS **grid-template-rows** property */
  gridTemplateRows?: Responsive<string>
}

export const gridParentProps: Record<string, PropDef> = {
  gridAutoFlow: {
    type: 'union',
    className: 'grid-auto-flow',
    values: GRID_AUTO_FLOW,
  },
  gridAutoColumns: {
    type: 'string',
    className: 'grid-auto-columns',
    variable: '--grid-auto-columns',
  },
  gridAutoRows: {
    type: 'string',
    className: 'grid-auto-rows',
    variable: '--grid-auto-rows',
  },
  gridTemplateColumns: {
    type: 'string',
    className: 'grid-template-columns',
    variable: '--grid-template-columns',
  },
  gridTemplateRows: {
    type: 'string',
    className: 'grid-template-rows',
    variable: '--grid-template-rows',
  },
}
