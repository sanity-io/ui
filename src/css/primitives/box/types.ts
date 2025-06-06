import type {AlignItemsStyleProps} from '../../props/alignItems/types'
import type {BorderStyleProps} from '../../props/border/types'
import type {BoxSizingStyleProps} from '../../props/boxSizing/types'
import type {DisplayStyleProps} from '../../props/display/types'
import type {FlexStyleProps} from '../../props/flex/types'
import type {FlexDirectionStyleProps} from '../../props/flexDirection/types'
import type {FlexWrapStyleProps} from '../../props/flexWrap/types'
import type {GapStyleProps} from '../../props/gap/types'
import type {GridAutoColumnsStyleProps} from '../../props/gridAutoColumns/types'
import type {GridAutoFlowStyleProps} from '../../props/gridAutoFlow/types'
import type {GridAutoRowsStyleProps} from '../../props/gridAutoRows/types'
import type {GridColumnStyleProps} from '../../props/gridColumn/types'
import type {GridColumnEndStyleProps} from '../../props/gridColumnEnd/types'
import type {GridColumnStartStyleProps} from '../../props/gridColumnStart/types'
import type {GridRowStyleProps} from '../../props/gridRow/types'
import type {GridRowEndStyleProps} from '../../props/gridRowEnd/types'
import type {GridRowStartStyleProps} from '../../props/gridRowStart/types'
import type {GridTemplateColumnsStyleProps} from '../../props/gridTemplateColumns/types'
import type {GridTemplateRowsStyleProps} from '../../props/gridTemplateRows/types'
import type {HeightStyleProps} from '../../props/height/types'
import type {InsetStyleProps} from '../../props/inset/types'
import type {JustifyContentStyleProps} from '../../props/justifyContent/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {MinHeightStyleProps} from '../../props/minHeight/types'
import type {MinWidthStyleProps} from '../../props/minWidth/types'
import type {OverflowStyleProps} from '../../props/overflow/types'
import type {PaddingStyleProps} from '../../props/padding/types'
import type {PointerEventsStyleProps} from '../../props/pointerEvents/types'
import type {PositionStyleProps} from '../../props/position/types'
import type {RadiusStyleProps} from '../../props/radius/types'
import type {ShadowStyleProps} from '../../props/shadow/types'
import type {TextAlignStyleProps} from '../../props/textAlign/types'
import type {WidthStyleProps} from '../../props/width/types'

/** @public */
export interface BoxStyleProps
  extends AlignItemsStyleProps,
    BorderStyleProps,
    DisplayStyleProps,
    FlexDirectionStyleProps,
    FlexStyleProps,
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
