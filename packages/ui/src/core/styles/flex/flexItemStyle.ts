import {css} from 'styled-components'

import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_ruleSet, responsiveRules} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexItemStyleProps} from './types'

const RULES = _ruleSet(css<ResponsiveFlexItemStyleProps & ThemeProps>`
  min-width: 0;
  min-height: 0;
  ${responsiveFlexItemStyle}
`)

export function flexItemStyle(): CSSObject[] {
  return RULES
}

function responsiveFlexItemStyle(props: ResponsiveFlexItemStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$flex,
    (flex) => css`
      flex: ${flex};
    `,
  )
}
