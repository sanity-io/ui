import {css} from 'styled-components'

import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_ruleSet, responsiveRules} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveGridItemStyleProps} from './types'

const RULES = _ruleSet(css<ResponsiveGridItemStyleProps & ThemeProps>`
  ${responsiveGridItemRowStyle}
  ${responsiveGridItemRowStartStyle}
  ${responsiveGridItemRowEndStyle}
  ${responsiveGridItemColumnStyle}
  ${responsiveGridItemColumnStartStyle}
  ${responsiveGridItemColumnEndStyle}
`)

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

  return responsiveRules(
    media,
    props.$row,
    (row) => css`
      grid-row: ${typeof row === 'number' ? `span ${row} / span ${row}` : GRID_ITEM_ROW[row]};
    `,
  )
}

function responsiveGridItemRowStartStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$rowStart,
    (rowStart) => css`
      grid-row-start: ${rowStart};
    `,
  )
}

function responsiveGridItemRowEndStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$rowEnd,
    (rowEnd) => css`
      grid-row-end: ${rowEnd};
    `,
  )
}

function responsiveGridItemColumnStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$column,
    (column) => css`
      grid-column: ${
        typeof column === 'number' ? `span ${column} / span ${column}` : GRID_ITEM_COLUMN[column]
      };
    `,
  )
}

function responsiveGridItemColumnStartStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$columnStart,
    (columnStart) => css`
      grid-column-start: ${columnStart};
    `,
  )
}

function responsiveGridItemColumnEndStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$columnEnd,
    (columnEnd) => css`
      grid-column-end: ${columnEnd};
    `,
  )
}
