import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {FlexItemStyleProps} from './types'

export function flexItemStyle({flex, theme}: FlexItemStyleProps & ThemeProps) {
  return responsive(
    theme.sanity.media,
    getResponsiveProp(flex).map((val) => ({flex: val}))
  )
}
