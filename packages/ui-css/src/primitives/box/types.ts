import {type ExactKeyTuple} from '../../lib/props/_keys'
import {ALIGN_ITEMS_STYLE_PROP_KEYS, type AlignItemsStyleProps} from '../../props/alignItems/types'
import {BORDER_STYLE_PROP_KEYS, type BorderStyleProps} from '../../props/border/types'
import {type BoxSizingStyleProps} from '../../props/boxSizing/types'
import {DISPLAY_STYLE_PROP_KEYS, type DisplayStyleProps} from '../../props/display/types'
import {FLEX_PROP_STYLE_PROP_KEYS, type FlexPropStyleProps} from '../../props/flex/types'
import {
  FLEX_DIRECTION_STYLE_PROP_KEYS,
  type FlexDirectionStyleProps,
} from '../../props/flexDirection/types'
import {FLEX_WRAP_STYLE_PROP_KEYS, type FlexWrapStyleProps} from '../../props/flexWrap/types'
import {GAP_STYLE_PROP_KEYS, type GapStyleProps} from '../../props/gap/types'
import {
  GRID_AUTO_COLUMNS_STYLE_PROP_KEYS,
  type GridAutoColumnsStyleProps,
} from '../../props/gridAutoColumns/types'
import {
  GRID_AUTO_FLOW_STYLE_PROP_KEYS,
  type GridAutoFlowStyleProps,
} from '../../props/gridAutoFlow/types'
import {
  GRID_AUTO_ROWS_STYLE_PROP_KEYS,
  type GridAutoRowsStyleProps,
} from '../../props/gridAutoRows/types'
import {GRID_COLUMN_STYLE_PROP_KEYS, type GridColumnStyleProps} from '../../props/gridColumn/types'
import {
  GRID_COLUMN_END_STYLE_PROP_KEYS,
  type GridColumnEndStyleProps,
} from '../../props/gridColumnEnd/types'
import {
  GRID_COLUMN_START_STYLE_PROP_KEYS,
  type GridColumnStartStyleProps,
} from '../../props/gridColumnStart/types'
import {GRID_ROW_STYLE_PROP_KEYS, type GridRowStyleProps} from '../../props/gridRow/types'
import {GRID_ROW_END_STYLE_PROP_KEYS, type GridRowEndStyleProps} from '../../props/gridRowEnd/types'
import {
  GRID_ROW_START_STYLE_PROP_KEYS,
  type GridRowStartStyleProps,
} from '../../props/gridRowStart/types'
import {
  GRID_TEMPLATE_COLUMNS_STYLE_PROP_KEYS,
  type GridTemplateColumnsStyleProps,
} from '../../props/gridTemplateColumns/types'
import {
  GRID_TEMPLATE_ROWS_STYLE_PROP_KEYS,
  type GridTemplateRowsStyleProps,
} from '../../props/gridTemplateRows/types'
import {HEIGHT_STYLE_PROP_KEYS, type HeightStyleProps} from '../../props/height/types'
import {INSET_STYLE_PROP_KEYS, type InsetStyleProps} from '../../props/inset/types'
import {
  JUSTIFY_CONTENT_STYLE_PROP_KEYS,
  type JustifyContentStyleProps,
} from '../../props/justifyContent/types'
import {MARGIN_STYLE_PROP_KEYS, type MarginStyleProps} from '../../props/margin/types'
import {MAX_WIDTH_STYLE_PROP_KEYS, type MaxWidthStyleProps} from '../../props/maxWidth/types'
import {MIN_HEIGHT_STYLE_PROP_KEYS, type MinHeightStyleProps} from '../../props/minHeight/types'
import {MIN_WIDTH_STYLE_PROP_KEYS, type MinWidthStyleProps} from '../../props/minWidth/types'
import {OVERFLOW_STYLE_PROP_KEYS, type OverflowStyleProps} from '../../props/overflow/types'
import {PADDING_STYLE_PROP_KEYS, type PaddingStyleProps} from '../../props/padding/types'
import {
  POINTER_EVENTS_STYLE_PROP_KEYS,
  type PointerEventsStyleProps,
} from '../../props/pointerEvents/types'
import {POSITION_STYLE_PROP_KEYS, type PositionStyleProps} from '../../props/position/types'
import {RADIUS_STYLE_PROP_KEYS, type RadiusStyleProps} from '../../props/radius/types'
import {SHADOW_STYLE_PROP_KEYS, type ShadowStyleProps} from '../../props/shadow/types'
import {TEXT_ALIGN_STYLE_PROP_KEYS, type TextAlignStyleProps} from '../../props/textAlign/types'
import {WIDTH_STYLE_PROP_KEYS, type WidthStyleProps} from '../../props/width/types'

/** @public */
export interface BoxStyleProps
  extends
    AlignItemsStyleProps,
    BorderStyleProps,
    DisplayStyleProps,
    FlexDirectionStyleProps,
    FlexPropStyleProps,
    FlexWrapStyleProps,
    GapStyleProps,
    GridAutoColumnsStyleProps,
    GridAutoFlowStyleProps,
    GridAutoRowsStyleProps,
    GridColumnEndStyleProps,
    GridColumnStartStyleProps,
    GridColumnStyleProps,
    GridRowEndStyleProps,
    GridRowStartStyleProps,
    GridRowStyleProps,
    GridTemplateColumnsStyleProps,
    GridTemplateRowsStyleProps,
    HeightStyleProps,
    InsetStyleProps,
    JustifyContentStyleProps,
    MarginStyleProps,
    MaxWidthStyleProps,
    MinHeightStyleProps,
    MinWidthStyleProps,
    OverflowStyleProps,
    PaddingStyleProps,
    PointerEventsStyleProps,
    PositionStyleProps,
    RadiusStyleProps,
    ShadowStyleProps,
    TextAlignStyleProps,
    WidthStyleProps {
  className?: string
  muted?: boolean
  outline?: 'none'
  sizing?: BoxSizingStyleProps['boxSizing']
}

/** @internal */
export const BOX_STYLE_PROP_KEYS = [
  ...ALIGN_ITEMS_STYLE_PROP_KEYS,
  ...BORDER_STYLE_PROP_KEYS,
  ...DISPLAY_STYLE_PROP_KEYS,
  ...FLEX_PROP_STYLE_PROP_KEYS,
  ...FLEX_DIRECTION_STYLE_PROP_KEYS,
  ...FLEX_WRAP_STYLE_PROP_KEYS,
  ...GAP_STYLE_PROP_KEYS,
  ...GRID_AUTO_COLUMNS_STYLE_PROP_KEYS,
  ...GRID_AUTO_FLOW_STYLE_PROP_KEYS,
  ...GRID_AUTO_ROWS_STYLE_PROP_KEYS,
  ...GRID_COLUMN_STYLE_PROP_KEYS,
  ...GRID_COLUMN_END_STYLE_PROP_KEYS,
  ...GRID_COLUMN_START_STYLE_PROP_KEYS,
  ...GRID_ROW_STYLE_PROP_KEYS,
  ...GRID_ROW_END_STYLE_PROP_KEYS,
  ...GRID_ROW_START_STYLE_PROP_KEYS,
  ...GRID_TEMPLATE_COLUMNS_STYLE_PROP_KEYS,
  ...GRID_TEMPLATE_ROWS_STYLE_PROP_KEYS,
  ...HEIGHT_STYLE_PROP_KEYS,
  ...INSET_STYLE_PROP_KEYS,
  ...JUSTIFY_CONTENT_STYLE_PROP_KEYS,
  ...MARGIN_STYLE_PROP_KEYS,
  ...MAX_WIDTH_STYLE_PROP_KEYS,
  ...MIN_HEIGHT_STYLE_PROP_KEYS,
  ...MIN_WIDTH_STYLE_PROP_KEYS,
  ...OVERFLOW_STYLE_PROP_KEYS,
  ...PADDING_STYLE_PROP_KEYS,
  ...POINTER_EVENTS_STYLE_PROP_KEYS,
  ...POSITION_STYLE_PROP_KEYS,
  ...RADIUS_STYLE_PROP_KEYS,
  ...SHADOW_STYLE_PROP_KEYS,
  ...TEXT_ALIGN_STYLE_PROP_KEYS,
  ...WIDTH_STYLE_PROP_KEYS,
  'className',
  'muted',
  'outline',
  'sizing',
] as const

// assert exact keys
BOX_STYLE_PROP_KEYS satisfies ExactKeyTuple<BoxStyleProps, typeof BOX_STYLE_PROP_KEYS>
