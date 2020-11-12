import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {GridItemProps} from './types'

export function gridItemStyle() {
  return [
    responsiveGridItemRowStyle,
    responsiveGridItemRowStartStyle,
    responsiveGridItemRowEndStyle,
    responsiveGridItemColumnStyle,
    responsiveGridItemColumnStartStyle,
    responsiveGridItemColumnEndStyle,
  ]
}

const GRID_ITEM_ROW = {
  auto: 'auto',
  full: '1 / -1',
}

const GRID_ITEM_COLUMN = {
  auto: 'auto',
  full: '1 / -1',
}

function responsiveGridItemRowStyle({row, theme}: GridItemProps & ThemeProps) {
  return responsive(
    theme.media,
    getResponsiveProp(row).map((val) => {
      if (typeof val === 'number') {
        return {gridRow: `span ${val} / span ${val}`}
      }

      return {gridRow: GRID_ITEM_ROW[val]}
    })
  )
}

function responsiveGridItemRowStartStyle({rowStart, theme}: GridItemProps & ThemeProps) {
  return responsive(
    theme.media,
    getResponsiveProp(rowStart).map((val) => ({gridRowStart: val}))
  )
}

function responsiveGridItemRowEndStyle({rowEnd, theme}: GridItemProps & ThemeProps) {
  return responsive(
    theme.media,
    getResponsiveProp(rowEnd).map((val) => ({gridRowEnd: val}))
  )
}

function responsiveGridItemColumnStyle({column, theme}: GridItemProps & ThemeProps) {
  return responsive(
    theme.media,
    getResponsiveProp(column).map((val) => {
      if (typeof val === 'number') {
        return {gridColumn: `span ${val} / span ${val}`}
      }

      return {gridColumn: GRID_ITEM_COLUMN[val]}
    })
  )
}

function responsiveGridItemColumnStartStyle({columnStart, theme}: GridItemProps & ThemeProps) {
  return responsive(
    theme.media,
    getResponsiveProp(columnStart).map((val) => ({gridColumnStart: val}))
  )
}

function responsiveGridItemColumnEndStyle({columnEnd, theme}: GridItemProps & ThemeProps) {
  return responsive(
    theme.media,
    getResponsiveProp(columnEnd).map((val) => ({gridColumnEnd: val}))
  )
}
