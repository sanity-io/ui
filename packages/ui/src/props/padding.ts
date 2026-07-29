import {type PropDef} from '../types/PropDef'
import {type Responsive} from '../types/Responsive'
import {SPACE, type Space} from '../types/Space'

/** @public */
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

export const paddingProps: Record<string, PropDef> = {
  padding: {
    type: 'union',
    className: 'p',
    values: SPACE,
  },
  paddingX: {
    type: 'union',
    className: 'px',
    values: SPACE,
  },
  paddingY: {
    type: 'union',
    className: 'py',
    values: SPACE,
  },
  paddingTop: {
    type: 'union',
    className: 'pt',
    values: SPACE,
  },
  paddingRight: {
    type: 'union',
    className: 'pr',
    values: SPACE,
  },
  paddingBottom: {
    type: 'union',
    className: 'pb',
    values: SPACE,
  },
  paddingLeft: {
    type: 'union',
    className: 'pl',
    values: SPACE,
  },
}
