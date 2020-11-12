export interface GridStyleProps {
  autoRows?: 'auto' | 'min' | 'max' | 'fr'
  autoCols?: 'auto' | 'min' | 'max' | 'fr'
  autoFlow?: 'row' | 'column' | 'row dense' | 'column dense'
  cols?: number | number[]
  gap?: number | number[]
  rows?: number | number[]
}

type GridItemColumn = 'auto' | 'full' | number
type GridItemColumnStart = 'auto' | number
type GridItemColumnEnd = 'auto' | number

type GridItemRow = 'auto' | 'full' | number
type GridItemRowStart = 'auto' | number
type GridItemRowEnd = 'auto' | number

export interface GridItemProps {
  column?: GridItemColumn | GridItemColumn[]
  columnStart?: GridItemColumnStart | GridItemColumnStart[]
  columnEnd?: GridItemColumnEnd | GridItemColumnEnd[]

  row?: GridItemRow | GridItemRow[]
  rowStart?: GridItemRowStart | GridItemRowStart[]
  rowEnd?: GridItemRowEnd | GridItemRowEnd[]
}
