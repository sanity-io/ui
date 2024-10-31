import type {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexValue,
  FlexWrap,
  GridItemColumn,
  GridItemColumnEnd,
  GridItemColumnStart,
  GridItemRow,
  GridItemRowEnd,
  GridItemRowStart,
} from '@sanity/ui/css'

import type {
  BoxDisplay,
  BoxHeight,
  BoxOverflow,
  BoxSizing,
  GridAutoCols,
  GridAutoFlow,
  GridAutoRows,
  Radius,
} from '../types'

/**
 * @public
 * @deprecated
 */
export interface ResponsiveBorderProps {
  border?: boolean | boolean[]
  borderTop?: boolean | boolean[]
  borderRight?: boolean | boolean[]
  borderBottom?: boolean | boolean[]
  borderLeft?: boolean | boolean[]
}

/**
 * @public
 * @deprecated
 */
export interface ResponsiveBoxProps {
  display?: BoxDisplay | BoxDisplay[]
  height?: BoxHeight | BoxHeight[]
  overflow?: BoxOverflow | BoxOverflow[]
  sizing?: BoxSizing | BoxSizing[]
}

/**
 * @public
 * @deprecated
 */
export interface ResponsiveFlexProps {
  align?: FlexAlign | FlexAlign[]
  direction?: FlexDirection | FlexDirection[]
  justify?: FlexJustify | FlexJustify[]
  wrap?: FlexWrap | FlexWrap[]
}

/**
 * @public
 * @deprecated
 */
export interface ResponsiveFlexItemProps {
  /** Sets the flex CSS attribute. The property is responsive. */
  flex?: FlexValue | FlexValue[]
}

/**
 * @public
 * @deprecated
 */
export interface ResponsiveGridProps {
  autoRows?: GridAutoRows | GridAutoRows[]
  autoCols?: GridAutoCols | GridAutoCols[]
  autoFlow?: GridAutoFlow | GridAutoFlow[]
  columns?: number | number[]
  rows?: number | number[]
}

/**
 * @public
 * @deprecated
 */
export interface ResponsiveGridItemProps {
  column?: GridItemColumn | GridItemColumn[]
  columnStart?: GridItemColumnStart | GridItemColumnStart[]
  columnEnd?: GridItemColumnEnd | GridItemColumnEnd[]
  row?: GridItemRow | GridItemRow[]
  rowStart?: GridItemRowStart | GridItemRowStart[]
  rowEnd?: GridItemRowEnd | GridItemRowEnd[]
}

/**
 * @public
 * @deprecated
 */
export interface ResponsiveMarginProps {
  /** Applies margins to all sides. The property is responsive. */
  margin?: number | number[]
  /** Applies margins to the left and right sides. The property is responsive. */
  marginX?: number | number[]
  /** Applies margins to the top and bottom sides. The property is responsive. */
  marginY?: number | number[]
  marginTop?: number | number[]
  marginRight?: number | number[]
  marginBottom?: number | number[]
  marginLeft?: number | number[]
}

/**
 * @public
 * @deprecated
 */
export interface ResponsivePaddingProps {
  padding?: number | number[]
  paddingX?: number | number[]
  paddingY?: number | number[]
  paddingTop?: number | number[]
  paddingRight?: number | number[]
  paddingBottom?: number | number[]
  paddingLeft?: number | number[]
}

/**
 * @public
 * @deprecated
 */
export interface ResponsiveRadiusProps {
  radius?: Radius | Radius[]
}

/**
 * @public
 * @deprecated
 */
export interface ResponsiveShadowProps {
  shadow?: number | number[]
}

/**
 * @public
 * @deprecated
 */
export interface ResponsiveWidthProps {
  width?: number | 'auto' | (number | 'auto')[]
}

/** @public */
export type Delay =
  | number
  | Partial<{
      open: number
      close: number
    }>
