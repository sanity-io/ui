import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_responsive, _ruleSet} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveGridItemStyleProps} from './types'

const RULES = _ruleSet(
  responsiveGridItemRowStyle,
  responsiveGridItemRowStartStyle,
  responsiveGridItemRowEndStyle,
  responsiveGridItemColumnStyle,
  responsiveGridItemColumnStartStyle,
  responsiveGridItemColumnEndStyle,
)

export function responsiveGridItemStyle(): CSSObject[] {
  return RULES
}

const GRID_ITEM_ROW = {
  auto: 'auto',
  full: '1 / -1',
}

const GRID_ITEM_COLUMN = {
  auto: 'auto',
  full: '1 / -1',
}

function responsiveGridItemRowStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$row, (row) => {
    if (typeof row === 'number') {
      return {gridRow: `span ${row} / span ${row}`}
    }

    return {gridRow: GRID_ITEM_ROW[row]}
  })
}

function responsiveGridItemRowStartStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$rowStart, (rowStart) => ({
    gridRowStart: `${rowStart}`,
  }))
}

function responsiveGridItemRowEndStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$rowEnd, (rowEnd) => ({gridRowEnd: `${rowEnd}`}))
}

function responsiveGridItemColumnStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$column, (column) => {
    if (typeof column === 'number') {
      return {gridColumn: `span ${column} / span ${column}`}
    }

    return {gridColumn: GRID_ITEM_COLUMN[column]}
  })
}

function responsiveGridItemColumnStartStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$columnStart, (columnStart) => ({
    gridColumnStart: `${columnStart}`,
  }))
}

function responsiveGridItemColumnEndStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$columnEnd, (columnEnd) => ({
    gridColumnEnd: `${columnEnd}`,
  }))
}
