import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {ResponsiveFontProps} from './types'

export function responsiveCodeFontStyle(props: ResponsiveFontProps & ThemeProps) {
  return responsiveFont('code', props)
}
