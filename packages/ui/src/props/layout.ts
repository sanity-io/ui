import { type PropDef } from "../types/PropDef";
import { type BorderProps, borderProps } from "./border";
import { type HeightProps, heightProps } from "./height";
import { type PaddingProps, paddingProps } from "./padding";
import { type WidthProps, widthProps } from "./width";

export type LayoutProps =
  | BorderProps
  | HeightProps
  | PaddingProps
  | WidthProps

export const layoutProps: Record<string, PropDef> = {
  ...borderProps,
  ...heightProps,
  ...paddingProps,
  ...widthProps,
}
