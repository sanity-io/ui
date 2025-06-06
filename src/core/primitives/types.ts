import type {
  AlignItems,
  BoxHeight,
  BoxOverflow,
  BoxSizing,
  Flex,
  FlexDirection,
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
  JustifyContent,
} from '@sanity/ui/css'
import type {Radius} from '@sanity/ui/theme'

import type {BoxDisplay} from './box/types'

/**
 * @public
 * @deprecated No longer used.
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
 * @deprecated No longer used.
 */
export interface ResponsiveBoxProps {
  display?: BoxDisplay | BoxDisplay[]
  height?: BoxHeight | BoxHeight[]
  overflow?: BoxOverflow | BoxOverflow[]
  sizing?: BoxSizing | BoxSizing[]
}

/**
 * @public
 * @deprecated No longer used.
 */
export interface ResponsiveFlexProps {
  align?: AlignItems | AlignItems[]
  direction?: FlexDirection | FlexDirection[]
  justify?: JustifyContent | JustifyContent[]
  wrap?: FlexWrap | FlexWrap[]
}

/**
 * @public
 * @deprecated No longer used.
 */
export interface ResponsiveFlexItemProps {
  /** Sets the flex CSS attribute. The property is responsive. */
  flex?: Flex | Flex[]
}

/**
 * @public
 * @deprecated No longer used.
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
 * @deprecated No longer used.
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
 * @deprecated No longer used.
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
 * @deprecated No longer used.
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
 * @deprecated No longer used.
 */
export interface ResponsiveRadiusProps {
  radius?: Radius | Radius[]
}

/**
 * @public
 * @deprecated No longer used.
 */
export interface ResponsiveShadowProps {
  shadow?: number | number[]
}

/**
 * @public
 * @deprecated No longer used.
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
