import {type PropDef} from '../types/PropDef'
import {type BorderProps, borderProps} from './border'
import {type FlexChildProps, flexChildProps} from './flexChild'
import {type GridChildProps, gridChildProps} from './gridChild'
import {type HeightProps, heightProps} from './height'
import {type MarginProps, marginProps} from './margin'
import {type OverflowProps, overflowProps} from './overflow'
import {type PaddingProps, paddingProps} from './padding'
import {type PositionProps, positionProps} from './position'
import {type ShadowProps, shadowProps} from './shadow'
import {layoutToneProps, type LayoutToneProps} from './tone'
import {type WidthProps, widthProps} from './width'
import {type ZIndexProps, zIndexProps} from './zIndex'

/** @public */
export interface LayoutProps
  extends
    LayoutToneProps,
    WidthProps,
    HeightProps,
    MarginProps,
    BorderProps,
    PaddingProps,
    PositionProps,
    OverflowProps,
    FlexChildProps,
    GridChildProps,
    ZIndexProps,
    ShadowProps {}

export const layoutProps: Record<string, PropDef> = {
  ...layoutToneProps,
  ...widthProps,
  ...heightProps,
  ...marginProps,
  ...borderProps,
  ...paddingProps,
  ...positionProps,
  ...overflowProps,
  ...flexChildProps,
  ...gridChildProps,
  ...shadowProps,
  ...zIndexProps,
}
