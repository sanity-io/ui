import { type PropDef } from "../types/PropDef";
import { type ToneProps, toneProps } from "./tone";
import { type WidthProps, widthProps } from "./width";
import { type HeightProps, heightProps } from "./height";
import { type MarginProps, marginProps } from "./margin";
import { type BorderProps, borderProps } from "./border";
import { type PaddingProps, paddingProps } from "./padding";
import { type PositionProps, positionProps } from "./position";
import { type OverflowProps, overflowProps } from "./overflow";
import { type FlexChildProps, flexChildProps } from "./flexChild";
import { type GridChildProps, gridChildProps } from "./gridChild";

export interface LayoutProps extends
  ToneProps,
  WidthProps,
  HeightProps,
  MarginProps,
  BorderProps,
  PaddingProps,
  PositionProps,
  OverflowProps,
  FlexChildProps,
  GridChildProps
{}

export const layoutProps: Record<string, PropDef> = {
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
