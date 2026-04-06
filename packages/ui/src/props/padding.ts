import {type PropDef} from '../types/PropDef'
import {type Responsive} from '../types/Responsive'
import {SPACE, type Space} from '../types/Space'

export interface PaddingProps {
  /** CSS **padding** property */
  padding?: Responsive<Space>
  /** CSS **padding-left** and **padding-right** properties */
  paddingX?: Responsive<Space>
  /** CSS **padding-top** and **padding-bottom** properties */
  paddingY?: Responsive<Space>
  /** CSS **padding-top** property */
  paddingTop?: Responsive<Space>
  /** CSS **padding-right** property */
  paddingRight?: Responsive<Space>
  /** CSS **padding-bottom** property */
  paddingBottom?: Responsive<Space>
  /** CSS **padding-left** property */
  paddingLeft?: Responsive<Space>
}

export const paddingProps: Record<string, PropDef<Space>> = {
  padding: {
    type: 'union',
    className: 'padding',
    values: SPACE,
  },
  paddingX: {
    type: 'union',
    className: 'padding-x',
    values: SPACE,
  },
  paddingY: {
    type: 'union',
    className: 'padding-y',
    values: SPACE,
  },
  paddingTop: {
    type: 'union',
    className: 'padding-t',
    values: SPACE,
  },
  paddingRight: {
    type: 'union',
    className: 'padding-r',
    values: SPACE,
  },
  paddingBottom: {
    type: 'union',
    className: 'padding-b',
    values: SPACE,
  },
  paddingLeft: {
    type: 'union',
    className: 'padding-l',
    values: SPACE,
  },
}
