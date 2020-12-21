// Border
export interface ResponsiveBorderProps {
  border?: boolean | boolean[]
  borderTop?: boolean | boolean[]
  borderRight?: boolean | boolean[]
  borderBottom?: boolean | boolean[]
  borderLeft?: boolean | boolean[]
}

// Box
export type BoxSizing = 'content' | 'border'
export type BoxDisplay = 'none' | 'block' | 'grid' | 'flex' | 'inline-block'
export type BoxHeight = 'stretch' | 'fill'
export type BoxOverflow = 'visible' | 'hidden' | 'auto'
export interface ResponsiveBoxProps {
  display?: BoxDisplay | BoxDisplay[]
  height?: BoxHeight | BoxHeight[]
  overflow?: BoxOverflow | BoxOverflow[]
  sizing?: BoxSizing | BoxSizing[]
}

// Flex
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
export type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap'
export interface ResponsiveFlexProps {
  align?: FlexAlign | FlexAlign[]
  direction?: FlexDirection | FlexDirection[]
  justify?: FlexJustify | FlexJustify[]
  wrap?: FlexWrap | FlexWrap[]
}

// FlexItem
export interface ResponsiveFlexItemProps {
  flex?: number | number[]
}

// Grid
export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'
export type GridAutoCols = 'auto' | 'min' | 'max' | 'fr'
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'
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

// GridItem
type GridItemColumn = 'auto' | 'full' | number
type GridItemColumnStart = 'auto' | number
type GridItemColumnEnd = 'auto' | number
type GridItemRow = 'auto' | 'full' | number
type GridItemRowStart = 'auto' | number
type GridItemRowEnd = 'auto' | number
export interface ResponsiveGridItemProps {
  column?: GridItemColumn | GridItemColumn[]
  columnStart?: GridItemColumnStart | GridItemColumnStart[]
  columnEnd?: GridItemColumnEnd | GridItemColumnEnd[]
  row?: GridItemRow | GridItemRow[]
  rowStart?: GridItemRowStart | GridItemRowStart[]
  rowEnd?: GridItemRowEnd | GridItemRowEnd[]
}

// Margin
export interface ResponsiveMarginProps {
  margin?: number | number[]
  marginX?: number | number[]
  marginY?: number | number[]
  marginTop?: number | number[]
  marginRight?: number | number[]
  marginBottom?: number | number[]
  marginLeft?: number | number[]
}

// Padding
export interface ResponsivePaddingProps {
  padding?: number | number[]
  paddingX?: number | number[]
  paddingY?: number | number[]
  paddingTop?: number | number[]
  paddingRight?: number | number[]
  paddingBottom?: number | number[]
  paddingLeft?: number | number[]
}

// Radius
export interface ResponsiveRadiusProps {
  radius?: number | number[]
}

// Shadow
export interface ResponsiveShadowProps {
  shadow?: number | number[]
}

// Width
export interface ResponsiveWidthProps {
  width?: number | number[] | 'auto'
}
