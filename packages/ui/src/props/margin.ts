import {type PropDef} from '../types/PropDef'
import {type Responsive} from '../types/Responsive'
import {SPACE_AUTO_NEGATIVE, type SpaceAutoNegative} from '../types/Space'

/** @public */
export type MarginProps = {
  /** CSS **margin** property */
  margin?: Responsive<SpaceAutoNegative>
  /** CSS **margin-left** and **margin-right** properties */
  marginX?: Responsive<SpaceAutoNegative>
  /** CSS **margin-top** and **margin-bottom** properties */
  marginY?: Responsive<SpaceAutoNegative>
  /** CSS **margin-top** property */
  marginTop?: Responsive<SpaceAutoNegative>
  /** CSS **margin-right** property */
  marginRight?: Responsive<SpaceAutoNegative>
  /** CSS **margin-bottom** property */
  marginBottom?: Responsive<SpaceAutoNegative>
  /** CSS **margin-left** property */
  marginLeft?: Responsive<SpaceAutoNegative>
}

export const marginProps: Record<string, PropDef> = {
  margin: {
    type: 'union',
    className: 'm',
    values: SPACE_AUTO_NEGATIVE,
  },
  marginX: {
    type: 'union',
    className: 'mx',
    values: SPACE_AUTO_NEGATIVE,
  },
  marginY: {
    type: 'union',
    className: 'my',
    values: SPACE_AUTO_NEGATIVE,
  },
  marginTop: {
    type: 'union',
    className: 'mt',
    values: SPACE_AUTO_NEGATIVE,
  },
  marginRight: {
    type: 'union',
    className: 'mr',
    values: SPACE_AUTO_NEGATIVE,
  },
  marginBottom: {
    type: 'union',
    className: 'mb',
    values: SPACE_AUTO_NEGATIVE,
  },
  marginLeft: {
    type: 'union',
    className: 'ml',
    values: SPACE_AUTO_NEGATIVE,
  },
}
