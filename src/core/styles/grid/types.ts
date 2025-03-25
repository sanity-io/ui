import { GridAutoCols, GridAutoFlow, GridAutoRows } from '../../types/grid'
import { GridItemColumn, GridItemColumnEnd, GridItemColumnStart, GridItemRow, GridItemRowEnd, GridItemRowStart } from '../../types/gridItem'

/**
 * @internal
 */
export interface ResponsiveGridStyleProps {
  $autoRows: GridAutoRows[]
  $autoCols: GridAutoCols[]
  $autoFlow: GridAutoFlow[]
  $columns: number[]
  $gap: number[]
  $gapX: number[]
  $gapY: number[]
  $rows: number[]
}

/**
 * @internal
 */
export interface ResponsiveGridItemStyleProps {
  $column: GridItemColumn[]
  $columnStart: GridItemColumnStart[]
  $columnEnd: GridItemColumnEnd[]
  $row: GridItemRow[]
  $rowStart: GridItemRowStart[]
  $rowEnd: GridItemRowEnd[]
}
