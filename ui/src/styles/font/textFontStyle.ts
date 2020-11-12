import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {ResponsiveFontProps} from './types'

export function responsiveTextFont(props: ResponsiveFontProps & ThemeProps) {
  return responsiveFont('text', props)
}
