import {css} from 'styled-components'

import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_ruleSet, rem, responsiveRules} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveGridStyleProps} from './types'

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

const RULES = _ruleSet(css<ResponsiveGridStyleProps & ThemeProps>`
  &&:not([hidden]) {
    display: grid;
  }

  &[data-as='ul'],
  &[data-as='ol'] {
    list-style: none;
  }

  ${responsiveGridAutoFlowStyle}
  ${responsiveGridAutoRowsStyle}
  ${responsiveGridAutoColsStyle}
  ${responsiveGridColumnsStyle}
  ${responsiveGridRowsStyle}
  ${responsiveGridGapStyle}
  ${responsiveGridGapXStyle}
  ${responsiveGridGapYStyle}
`)

export function responsiveGridStyle(): CSSObject[] {
  return RULES
}

function responsiveGridAutoFlowStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$autoFlow,
    (autoFlow) => css`
      grid-auto-flow: ${autoFlow};
    `,
  )
}

function responsiveGridAutoRowsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$autoRows, (autoRows) =>
    autoRows
      ? css`
          grid-auto-rows: ${GRID_AUTO_ROWS[autoRows]};
        `
      : null,
  )
}

function responsiveGridAutoColsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$autoCols, (autoCols) =>
    autoCols
      ? css`
          grid-auto-columns: ${GRID_AUTO_COLUMS[autoCols]};
        `
      : null,
  )
}

function responsiveGridColumnsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$columns, (columns) =>
    columns
      ? css`
          grid-template-columns: repeat(${columns}, minmax(0, 1fr));
        `
      : null,
  )
}

function responsiveGridRowsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$rows, (rows) =>
    rows
      ? css`
          grid-template-rows: repeat(${rows}, minmax(0, 1fr));
        `
      : null,
  )
}

function responsiveGridGapStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {media, space} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$gap, (gap) =>
    gap
      ? css`
          grid-gap: ${rem(space[gap])};
        `
      : null,
  )
}

function responsiveGridGapXStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {media, space} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$gapX, (gapX) =>
    gapX
      ? css`
          column-gap: ${rem(space[gapX])};
        `
      : null,
  )
}

function responsiveGridGapYStyle(props: ResponsiveGridStyleProps & ThemeProps) {
  const {media, space} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$gapY, (gapY) =>
    gapY
      ? css`
          row-gap: ${rem(space[gapY])};
        `
      : null,
  )
}
