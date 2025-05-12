import {
  BorderStyleProps,
  DisplayStyleProps,
  FlexItemStyleProps,
  FlexStyleProps,
  GapStyleProps,
  GridItemStyleProps,
  GridStyleProps,
  HeightStyleProps,
  InsetStyleProps,
  MarginStyleProps,
  MaxWidthStyleProps,
  OverflowStyleProps,
  PaddingStyleProps,
  PointerEventsStyleProps,
  PositionStyleProps,
  RadiusStyleProps,
  WidthStyleProps,
} from '../../aspects'
import {ResponsiveProp} from '../../types'

/**
 * @public
 */
export type BoxSizing = 'content' | 'border'

/** @public */
export interface BoxStyleProps
  extends BorderStyleProps,
    DisplayStyleProps,
    FlexStyleProps,
    FlexItemStyleProps,
    GapStyleProps,
    GridStyleProps,
    GridItemStyleProps,
    HeightStyleProps,
    InsetStyleProps,
    MarginStyleProps,
    MaxWidthStyleProps,
    OverflowStyleProps,
    PaddingStyleProps,
    PointerEventsStyleProps,
    PositionStyleProps,
    RadiusStyleProps,
    WidthStyleProps {
  muted?: boolean
  outline?: 'none'
  sizing?: ResponsiveProp<BoxSizing>
}
