import {css} from 'styled-components'

import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_ruleSet, responsiveRules} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveBorderStyleProps} from './types'

const RULES = _ruleSet(css<ResponsiveBorderStyleProps & ThemeProps>`
  ${border}
  ${borderTop}
  ${borderRight}
  ${borderBottom}
  ${borderLeft}
`)

export function responsiveBorderStyle(): CSSObject[] {
  return RULES
}

function borderRules(
  props: ThemeProps,
  property: string,
  values: boolean[] | undefined,
): ReturnType<typeof css> {
  const {card, media} = getTheme_v2(props.theme)
  const borderStyle = `${card.border?.width ?? 1}px solid var(--card-border-color)`

  return responsiveRules(
    media,
    values,
    (value) => css`
      && {
        ${property}: ${value ? borderStyle : 0};
      }
    `,
  )
}

function border(props: ResponsiveBorderStyleProps & ThemeProps) {
  return borderRules(props, 'border', props.$border)
}

function borderTop(props: ResponsiveBorderStyleProps & ThemeProps) {
  return borderRules(props, 'border-top', props.$borderTop)
}

function borderRight(props: ResponsiveBorderStyleProps & ThemeProps) {
  return borderRules(props, 'border-right', props.$borderRight)
}

function borderBottom(props: ResponsiveBorderStyleProps & ThemeProps) {
  return borderRules(props, 'border-bottom', props.$borderBottom)
}

function borderLeft(props: ResponsiveBorderStyleProps & ThemeProps) {
  return borderRules(props, 'border-left', props.$borderLeft)
}
