import {CSSObject} from 'styled-components'
import {_responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveGridItemStyleProps} from './types'

// export function responsiveGridItemStyle(): Array<
//   (props: ResponsiveGridItemStyleProps & ThemeProps) => CSSObject[]
// > {
//   return [
//     responsiveGridItemRowStyle,
//     responsiveGridItemRowStartStyle,
//     responsiveGridItemRowEndStyle,
//     responsiveGridItemColumnStyle,
//     responsiveGridItemColumnStartStyle,
//     responsiveGridItemColumnEndStyle,
//   ]
// }

const GRID_ITEM_ROW = {
  auto: 'auto',
  full: '1 / -1',
}

const GRID_ITEM_COLUMN = {
  auto: 'auto',
  full: '1 / -1',
}

export function responsiveGridItemRowStyle(
  props: ResponsiveGridItemStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$row, (row) => {
    if (typeof row === 'number') {
      return {gridRow: `span ${row} / span ${row}`}
    }

    return {gridRow: GRID_ITEM_ROW[row]}
  })
}

export function responsiveGridItemRowStartStyle(
  props: ResponsiveGridItemStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$rowStart, (rowStart) => ({
    gridRowStart: rowStart,
  }))
}

export function responsiveGridItemRowEndStyle(
  props: ResponsiveGridItemStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$rowEnd, (rowEnd) => ({gridRowEnd: rowEnd}))
}

export function responsiveGridItemColumnStyle(
  props: ResponsiveGridItemStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$column, (column) => {
    if (typeof column === 'number') {
      return {gridColumn: `span ${column} / span ${column}`}
    }

    return {gridColumn: GRID_ITEM_COLUMN[column]}
  })
}

export function responsiveGridItemColumnStartStyle(
  props: ResponsiveGridItemStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$columnStart, (columnStart) => ({
    gridColumnStart: columnStart,
  }))
}

export function responsiveGridItemColumnEndStyle(
  props: ResponsiveGridItemStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$columnEnd, (columnEnd) => ({
    gridColumnEnd: columnEnd,
  }))
}
