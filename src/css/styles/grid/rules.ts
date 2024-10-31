import {responsiveRules} from '../../responsiveRules'
import {type Rules} from '../../types'

export const gridRules: Rules = {
  // autoCols
  ...responsiveRules('auto-cols-auto', {gridAutoColumns: 'auto'}),
  ...responsiveRules('auto-cols-min', {gridAutoColumns: 'min'}),
  ...responsiveRules('auto-cols-max', {gridAutoColumns: 'max'}),
  ...responsiveRules('auto-cols-fr', {gridAutoColumns: 'fr'}),

  // autoFlow
  ...responsiveRules('auto-flow-row', {gridAutoFlow: 'row'}),
  ...responsiveRules('auto-flow-column', {gridAutoFlow: 'column'}),
  ...responsiveRules('auto-flow-row-dense', {gridAutoFlow: 'row dense'}),
  ...responsiveRules('auto-flow-column-dense', {gridAutoFlow: 'column dense'}),

  // autoRows
  ...responsiveRules('auto-rows-auto', {gridAutoRows: 'auto'}),
  ...responsiveRules('auto-rows-min', {gridAutoRows: 'min-content'}),
  ...responsiveRules('auto-rows-max', {gridAutoRows: 'max-content'}),
  ...responsiveRules('auto-rows-fr', {gridAutoRows: 'minmax(0, 1fr)'}),

  // columns
  ...responsiveRules('columns-1', {gridTemplateColumns: 'repeat(1, 1fr)'}),
  ...responsiveRules('columns-2', {gridTemplateColumns: 'repeat(2, 1fr)'}),
  ...responsiveRules('columns-3', {gridTemplateColumns: 'repeat(3, 1fr)'}),
  ...responsiveRules('columns-4', {gridTemplateColumns: 'repeat(4, 1fr)'}),
  ...responsiveRules('columns-5', {gridTemplateColumns: 'repeat(5, 1fr)'}),
  ...responsiveRules('columns-6', {gridTemplateColumns: 'repeat(6, 1fr)'}),
  ...responsiveRules('columns-7', {gridTemplateColumns: 'repeat(7, 1fr)'}),
  ...responsiveRules('columns-8', {gridTemplateColumns: 'repeat(8, 1fr)'}),
  ...responsiveRules('columns-9', {gridTemplateColumns: 'repeat(9, 1fr)'}),
  ...responsiveRules('columns-10', {gridTemplateColumns: 'repeat(10, 1fr)'}),
  ...responsiveRules('columns-12', {gridTemplateColumns: 'repeat(12, 1fr)'}),

  // rows
  ...responsiveRules('rows-1', {gridTemplateRows: 'repeat(1, 1fr)'}),
  ...responsiveRules('rows-2', {gridTemplateRows: 'repeat(2, 1fr)'}),
  ...responsiveRules('rows-3', {gridTemplateRows: 'repeat(3, 1fr)'}),
  ...responsiveRules('rows-4', {gridTemplateRows: 'repeat(4, 1fr)'}),
  ...responsiveRules('rows-5', {gridTemplateRows: 'repeat(5, 1fr)'}),
  ...responsiveRules('rows-6', {gridTemplateRows: 'repeat(6, 1fr)'}),
  ...responsiveRules('rows-7', {gridTemplateRows: 'repeat(7, 1fr)'}),
  ...responsiveRules('rows-8', {gridTemplateRows: 'repeat(8, 1fr)'}),
  ...responsiveRules('rows-9', {gridTemplateRows: 'repeat(9, 1fr)'}),
  ...responsiveRules('rows-10', {gridTemplateRows: 'repeat(10, 1fr)'}),
  ...responsiveRules('rows-12', {gridTemplateRows: 'repeat(12, 1fr)'}),
}

// import {CSSObject, getTheme_v2} from '@sanity/ui/theme'
// import {rem, _responsive} from '../helpers'
// import {ThemeProps} from '../types'
// import {ResponsiveGridStyleProps} from './types'

// const GRID_AUTO_COLUMS = {
//   auto: 'auto',
//   min: 'min-content',
//   max: 'max-content',
//   fr: 'minmax(0, 1fr)',
// }

// const GRID_AUTO_ROWS = {
//   auto: 'auto',
//   min: 'min-content',
//   max: 'max-content',
//   fr: 'minmax(0, 1fr)',
// }

// export function responsiveGridStyle(): Array<
//   CSSObject | ((props: ResponsiveGridStyleProps & ThemeProps) => CSSObject[])
// > {
//   return [
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

// function responsiveGridAutoFlowStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const {media} = getTheme_v2(props.theme)

//   return _responsive(media, props.$autoFlow, (autoFlow) => ({
//     gridAutoFlow: autoFlow,
//   }))
// }

// function responsiveGridAutoRowsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const {media} = getTheme_v2(props.theme)

//   return _responsive(media, props.$autoRows, (autoRows) => ({
//     gridAutoRows: autoRows && GRID_AUTO_ROWS[autoRows],
//   }))
// }

// function responsiveGridAutoColsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const {media} = getTheme_v2(props.theme)

//   return _responsive(media, props.$autoCols, (autoCols) => ({
//     gridAutoColumns: autoCols && GRID_AUTO_COLUMS[autoCols],
//   }))
// }

// function responsiveGridColumnsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const {media} = getTheme_v2(props.theme)

//   return _responsive(media, props.$columns, (columns) => ({
//     gridTemplateColumns: columns && `repeat(${columns},minmax(0,1fr));`,
//   }))
// }

// function responsiveGridRowsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const {media} = getTheme_v2(props.theme)

//   return _responsive(media, props.$rows, (rows) => ({
//     gridTemplateRows: rows && `repeat(${rows},minmax(0,1fr));`,
//   }))
// }

// function responsiveGridGapStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const {media, space} = getTheme_v2(props.theme)

//   return _responsive(media, props.$gap, (gap) => ({
//     gridGap: gap ? rem(space[gap]) : undefined,
//   }))
// }

// function responsiveGridGapXStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const {media, space} = getTheme_v2(props.theme)

//   return _responsive(media, props.$gapX, (gapX) => ({
//     columnGap: gapX ? rem(space[gapX]) : undefined,
//   }))
// }

// function responsiveGridGapYStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const {media, space} = getTheme_v2(props.theme)

//   return _responsive(media, props.$gapY, (gapY) => ({
//     rowGap: gapY ? rem(space[gapY]) : undefined,
//   }))
// }
