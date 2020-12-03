import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {ResponsiveFontProps} from './types'

export function responsiveHeadingFont(props: ResponsiveFontProps & ThemeProps) {
  return responsiveFont('heading', props)
}
