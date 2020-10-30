import {getResponsiveProp, getResponsiveSpace} from '../helpers'
import {ThemeProps} from '../types'
import {PaddingProps} from './types'

export function padding(props: PaddingProps & ThemeProps) {
  const {theme} = props

  return [
    getResponsiveSpace(theme, ['padding'], getResponsiveProp(props.padding)),
    getResponsiveSpace(theme, ['paddingLeft', 'paddingRight'], getResponsiveProp(props.paddingX)),
    getResponsiveSpace(theme, ['paddingTop', 'paddingBottom'], getResponsiveProp(props.paddingY)),
    getResponsiveSpace(theme, ['paddingTop'], getResponsiveProp(props.paddingTop)),
    getResponsiveSpace(theme, ['paddingRight'], getResponsiveProp(props.paddingRight)),
    getResponsiveSpace(theme, ['paddingBottom'], getResponsiveProp(props.paddingBottom)),
    getResponsiveSpace(theme, ['paddingLeft'], getResponsiveProp(props.paddingLeft)),
  ].filter(Boolean)
}
