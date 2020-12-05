export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'
export type GridAutoCols = 'auto' | 'min' | 'max' | 'fr'
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'

export interface ResponsiveGridStyleProps {
  autoRows?: GridAutoRows | GridAutoRows[]
  autoCols?: GridAutoCols | GridAutoCols[]
  autoFlow?: GridAutoFlow | GridAutoFlow[]
  columns?: number | number[]
  gap?: number | number[]
  rows?: number | number[]
}

type GridItemColumn = 'auto' | 'full' | number
type GridItemColumnStart = 'auto' | number
type GridItemColumnEnd = 'auto' | number

type GridItemRow = 'auto' | 'full' | number
type GridItemRowStart = 'auto' | number
type GridItemRowEnd = 'auto' | number

export interface ResponsiveGridItemStyleProps {
  column?: GridItemColumn | GridItemColumn[]
  columnStart?: GridItemColumnStart | GridItemColumnStart[]
  columnEnd?: GridItemColumnEnd | GridItemColumnEnd[]

  row?: GridItemRow | GridItemRow[]
  rowStart?: GridItemRowStart | GridItemRowStart[]
  rowEnd?: GridItemRowEnd | GridItemRowEnd[]
}
