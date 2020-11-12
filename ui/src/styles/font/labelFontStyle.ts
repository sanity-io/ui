import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {ResponsiveFontProps} from './types'

export function responsiveLabelFont(props: ResponsiveFontProps & ThemeProps) {
  return responsiveFont('label', props)
}
