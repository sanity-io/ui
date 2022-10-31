import {CSSObject} from 'styled-components'
import {EMPTY_ARRAY} from '../../constants'
import {_responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexItemStyleProps} from './types'

export const __tmp_flexItemStyle: CSSObject = {
  minWidth: 0,
  minHeight: 0,
}

export function responsiveFlexItemStyle(
  props: ResponsiveFlexItemStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  if (!props.$flex) return EMPTY_ARRAY

  return _responsive(media, props.$flex, (flex) => ({flex}))
}
