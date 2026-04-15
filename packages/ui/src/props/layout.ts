import {type StyleProp} from '../types/StyleProp'
import {type BorderProps, borderProps} from './border'
import {type FlexChildProps, flexChildProps} from './flexChild'
import {type GridChildProps, gridChildProps} from './gridChild'
import {type HeightProps, heightProps} from './height'
import {type MarginProps, marginProps} from './margin'
import {type OverflowProps, overflowProps} from './overflow'
import {type PaddingProps, paddingProps} from './padding'
import {type PositionProps, positionProps} from './position'
import {type ToneProps, toneProps} from './tone'
import {type WidthProps, widthProps} from './width'

export interface LayoutProps
  extends
    ToneProps,
    WidthProps,
    HeightProps,
    MarginProps,
    BorderProps,
    PaddingProps,
    PositionProps,
    OverflowProps,
    FlexChildProps,
    GridChildProps {}

export const layoutProps: Record<string, StyleProp> = {
  ...toneProps,
  ...widthProps,
  ...heightProps,
  ...marginProps,
  ...borderProps,
  ...paddingProps,
  ...positionProps,
  ...overflowProps,
  ...flexChildProps,
  ...gridChildProps,
}
