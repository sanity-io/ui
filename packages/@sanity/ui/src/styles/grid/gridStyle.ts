import {CSSObject} from 'styled-components'
import {rem, _responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveGridStyleProps} from './types'

export const __tmp_gridStyle: CSSObject = {
  '&&:not([hidden])': {
    display: 'grid',
  },
  '&[data-as="ul"],&[data-as="ol"]': {
    listStyle: 'none',
  },
}

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

// export function responsiveGridStyle(): Array<
//   CSSObject | ((props: ResponsiveGridStyleProps & ThemeProps) => CSSObject[])
// > {
//   return [
//     __tmp_gridStyle,
//     responsiveGridAutoFlowStyle,
//     responsiveGridAutoRowsStyle,
//     responsiveGridAutoColsStyle,
//     responsiveGridColumnsStyle,
//     responsiveGridRowsStyle,
//     responsiveGridGapStyle,
//     responsiveGridGapXStyle,
//     responsiveGridGapYStyle,
//   ]
// }

export function responsiveGridAutoFlowStyle(
  props: ResponsiveGridStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$autoFlow, (autoFlow) => ({
    gridAutoFlow: autoFlow,
  }))
}

export function responsiveGridAutoRowsStyle(
  props: ResponsiveGridStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$autoRows, (autoRows) => ({
    gridAutoRows: autoRows && GRID_AUTO_ROWS[autoRows],
  }))
}

export function responsiveGridAutoColsStyle(
  props: ResponsiveGridStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$autoCols, (autoCols) => ({
    gridAutoColumns: autoCols && GRID_AUTO_COLUMS[autoCols],
  }))
}

export function responsiveGridColumnsStyle(
  props: ResponsiveGridStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$columns, (columns) => ({
    gridTemplateColumns: columns && `repeat(${columns},minmax(0,1fr));`,
  }))
}

export function responsiveGridRowsStyle(props: ResponsiveGridStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$rows, (rows) => ({
    gridTemplateRows: rows && `repeat(${rows},minmax(0,1fr));`,
  }))
}

export function responsiveGridGapStyle(props: ResponsiveGridStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media, space} = theme.sanity

  return _responsive(media, props.$gap, (gap) => ({
    gridGap: gap ? rem(space[gap]) : undefined,
  }))
}

export function responsiveGridGapXStyle(props: ResponsiveGridStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media, space} = theme.sanity

  return _responsive(media, props.$gapX, (gapX) => ({
    columnGap: gapX ? rem(space[gapX]) : undefined,
  }))
}

export function responsiveGridGapYStyle(props: ResponsiveGridStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media, space} = theme.sanity

  return _responsive(media, props.$gapY, (gapY) => ({
    rowGap: gapY ? rem(space[gapY]) : undefined,
  }))
}
