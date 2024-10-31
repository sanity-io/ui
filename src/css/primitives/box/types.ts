import {
  BorderStyleProps,
  DisplayStyleProps,
  FlexItemStyleProps,
  FlexStyleProps,
  GapStyleProps,
  GridItemStyleProps,
  GridStyleProps,
  InsetStyleProps,
  MarginStyleProps,
  MaxWidthStyleProps,
  OverflowStyleProps,
  PaddingStyleProps,
  PointerEventsStyleProps,
  PositionStyleProps,
  RadiusStyleProps,
  WidthStyleProps,
} from '../../styles'
import {ResponsiveProp} from '../../types'

/**
 * @public
 */
export type BoxSizing = 'content' | 'border'

/**
 * @public
 */
export type BoxHeight = 'stretch' | 'fill'

/** @public */
export interface BoxStyleProps
  extends BorderStyleProps,
    DisplayStyleProps,
    FlexStyleProps,
    FlexItemStyleProps,
    GapStyleProps,
    GridStyleProps,
    GridItemStyleProps,
    InsetStyleProps,
    MarginStyleProps,
    MaxWidthStyleProps,
    OverflowStyleProps,
    PaddingStyleProps,
    PointerEventsStyleProps,
    PositionStyleProps,
    RadiusStyleProps,
    WidthStyleProps {
  height?: ResponsiveProp<BoxHeight>
  muted?: boolean
  outline?: 'none'
  sizing?: ResponsiveProp<BoxSizing>
}
