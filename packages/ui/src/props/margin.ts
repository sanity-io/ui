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
    className: 'm',
    values: SPACE_AUTO,
  },
  marginX: {
    type: 'union',
    className: 'mx',
    values: SPACE_AUTO,
  },
  marginY: {
    type: 'union',
    className: 'my',
    values: SPACE_AUTO,
  },
  marginTop: {
    type: 'union',
    className: 'mt',
    values: SPACE_AUTO,
  },
  marginRight: {
    type: 'union',
    className: 'mr',
    values: SPACE_AUTO,
  },
  marginBottom: {
    type: 'union',
    className: 'mb',
    values: SPACE_AUTO,
  },
  marginLeft: {
    type: 'union',
    className: 'ml',
    values: SPACE_AUTO,
  },
}
