import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {ResponsiveFontProps} from './types'

export function headingFont(props: ResponsiveFontProps & ThemeProps) {
  return responsiveFont('heading', props)
}
