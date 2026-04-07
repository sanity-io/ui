import {type PropDef} from '../types/PropDef'
import {type Responsive} from '../types/Responsive'
import {SPACE_AUTO, type SpaceAuto} from '../types/Space'

export type MarginProps = {
  /** CSS **margin** property */
  margin?: Responsive<SpaceAuto>
  /** CSS **margin-left** and **margin-right** properties */
  marginX?: Responsive<SpaceAuto>
  /** CSS **margin-top** and **margin-bottom** properties */
  marginY?: Responsive<SpaceAuto>
  /** CSS **margin-top** property */
  marginTop?: Responsive<SpaceAuto>
  /** CSS **margin-right** property */
  marginRight?: Responsive<SpaceAuto>
  /** CSS **margin-bottom** property */
  marginBottom?: Responsive<SpaceAuto>
  /** CSS **margin-left** property */
  marginLeft?: Responsive<SpaceAuto>
}

export const marginProps: Record<string, PropDef> = {
  margin: {
    type: 'union',
    className: 'margin',
    values: SPACE_AUTO,
  },
  marginX: {
    type: 'union',
    className: 'margin-x',
    values: SPACE_AUTO,
  },
  marginY: {
    type: 'union',
    className: 'margin-y',
    values: SPACE_AUTO,
  },
  marginTop: {
    type: 'union',
    className: 'margin-t',
    values: SPACE_AUTO,
  },
  marginRight: {
    type: 'union',
    className: 'margin-r',
    values: SPACE_AUTO,
  },
  marginBottom: {
    type: 'union',
    className: 'margin-b',
    values: SPACE_AUTO,
  },
  marginLeft: {
    type: 'union',
    className: 'margin-l',
    values: SPACE_AUTO,
  },
}
