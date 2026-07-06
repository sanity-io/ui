import {
  BoxDisplay,
  BoxHeight,
  BoxOverflow,
  BoxSizing,
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexValue,
  FlexWrap,
  GridAutoCols,
  GridAutoFlow,
  GridAutoRows,
  GridItemColumn,
  GridItemColumnEnd,
  GridItemColumnStart,
  GridItemRow,
  GridItemRowEnd,
  GridItemRowStart,
  Radius,
} from '../types'

/**
 * @public
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
 */
export interface ResponsiveBoxProps {
  display?: BoxDisplay | BoxDisplay[]
  height?: BoxHeight | BoxHeight[]
  overflow?: BoxOverflow | BoxOverflow[]
  sizing?: BoxSizing | BoxSizing[]
}

/**
 * @public
 */
export interface ResponsiveFlexProps {
  align?: FlexAlign | FlexAlign[]
  direction?: FlexDirection | FlexDirection[]
  justify?: FlexJustify | FlexJustify[]
  wrap?: FlexWrap | FlexWrap[]
}

/**
 * @public
 */
export interface ResponsiveFlexItemProps {
  /** Sets the flex CSS attribute. The property is responsive. */
  flex?: FlexValue | FlexValue[]
}

/**
 * @public
 */
export interface ResponsiveGridProps {
  autoRows?: GridAutoRows | GridAutoRows[]
  autoCols?: GridAutoCols | GridAutoCols[]
  autoFlow?: GridAutoFlow | GridAutoFlow[]
  columns?: number | number[]
  gap?: number | number[]
  gapX?: number | number[]
  gapY?: number | number[]
  rows?: number | number[]
}

/**
 * @public
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
 */
export interface ResponsiveRadiusProps {
  radius?: Radius | Radius[]
}

/**
 * @public
 */
export interface ResponsiveShadowProps {
  shadow?: number | number[]
}

/**
 * @public
 */
export interface ResponsiveWidthProps {
  width?: number | 'auto' | (number | 'auto')[]
}

/**
 * @public
 */
export type Delay =
  | number
  | Partial<{
      open: number
      close: number
    }>
