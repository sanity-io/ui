import type {
  BorderStyleProps,
  BoxSizingStyleProps,
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
  MinHeightStyleProps,
  MinWidthStyleProps,
  OverflowStyleProps,
  PaddingStyleProps,
  PointerEventsStyleProps,
  PositionStyleProps,
  RadiusStyleProps,
  TextAlignStyleProps,
  WidthStyleProps,
} from '../../aspects'

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
    MinHeightStyleProps,
    MinWidthStyleProps,
    OverflowStyleProps,
    PaddingStyleProps,
    PointerEventsStyleProps,
    PositionStyleProps,
    RadiusStyleProps,
    TextAlignStyleProps,
    WidthStyleProps {
  muted?: boolean
  outline?: 'none'
  sizing?: BoxSizingStyleProps['boxSizing']
}
