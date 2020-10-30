import {getResponsiveProp, getResponsiveSpace} from '../helpers'
import {ThemeProps} from '../types'
import {MarginProps} from './types'

export function margin(props: MarginProps & ThemeProps) {
  const {theme} = props

  return [
    getResponsiveSpace(theme, ['margin'], getResponsiveProp(props.margin)),
    getResponsiveSpace(theme, ['marginLeft', 'marginRight'], getResponsiveProp(props.marginX)),
    getResponsiveSpace(theme, ['marginTop', 'marginBottom'], getResponsiveProp(props.marginY)),
    getResponsiveSpace(theme, ['marginTop'], getResponsiveProp(props.marginTop)),
    getResponsiveSpace(theme, ['marginRight'], getResponsiveProp(props.marginRight)),
    getResponsiveSpace(theme, ['marginBottom'], getResponsiveProp(props.marginBottom)),
    getResponsiveSpace(theme, ['marginLeft'], getResponsiveProp(props.marginLeft)),
  ].filter(Boolean)
}
