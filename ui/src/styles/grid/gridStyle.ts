import {Theme} from '../../theme'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {GridStyleProps} from './types'

const GRID_AUTO_COLUMS = {
  auto: 'auto',
  min: 'min-content',
  max: 'max-content',
  fr: 'minmax(0, 1fr)',
}

const GRID_AUTO_ROWS = {
  auto: 'auto',
  min: 'min-content',
  max: 'max-content',
  fr: 'minmax(0, 1fr)',
}

export function gridStyle({autoCols, autoFlow, autoRows}: GridStyleProps & {theme: Theme}) {
  return [
    {
      display: 'grid',
      gridAutoFlow: autoFlow,
      gridAutoColumns: autoCols && GRID_AUTO_COLUMS[autoCols],
      gridAutoRows: autoRows && GRID_AUTO_ROWS[autoRows],
    },
    responsiveGridColumnsStyle,
    responsiveGridRowsStyle,
    responsiveGridGapStyle,
  ]
}

function responsiveGridColumnsStyle({columns, theme}: GridStyleProps & {theme: Theme}) {
  return responsive(
    theme.media,
    getResponsiveProp(columns).map((val) => ({
      gridTemplateColumns: val && `repeat(${val}, minmax(0, 1fr));`,
    }))
  )
}

function responsiveGridRowsStyle({rows, theme}: GridStyleProps & {theme: Theme}) {
  return responsive(
    theme.media,
    getResponsiveProp(rows).map((val) => ({
      gridTemplateRows: val && `repeat(${val}, minmax(0, 1fr));`,
    }))
  )
}

function responsiveGridGapStyle({gap, theme}: GridStyleProps & {theme: Theme}) {
  return responsive(
    theme.media,
    getResponsiveProp(gap).map((spaceIndex) => ({
      gridGap: gap ? rem(theme.space[spaceIndex]) : undefined,
    }))
  )
}
