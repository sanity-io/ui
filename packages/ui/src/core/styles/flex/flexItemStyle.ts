import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_responsive, _ruleSet} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexItemStyleProps} from './types'

const BASE_STYLE: CSSObject = {
  minWidth: 0,
  minHeight: 0,
}

const RULES = _ruleSet(BASE_STYLE, responsiveFlexItemStyle)

export function flexItemStyle(): CSSObject[] {
  return RULES
}

function responsiveFlexItemStyle(props: ResponsiveFlexItemStyleProps & ThemeProps): CSSObject[] {
  const {media} = getTheme_v2(props.theme)

  if (!props.$flex) return _ruleSet()

  return _responsive(media, props.$flex, (flex) => ({flex: `${flex}`}))
}
