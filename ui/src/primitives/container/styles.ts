import {getResponsiveProp, rem, responsive, ThemeProps} from '../../styles'
import {ResponsiveWidthStyleProps} from './types'

export function containerBaseStyle() {
  return {width: '100%', margin: '0 auto'}
}

export function responsiveContainerWidthStyle(props: ResponsiveWidthStyleProps & ThemeProps) {
  const {theme} = props
  const {container, media} = theme.sanity

  return responsive(media, getResponsiveProp(props.width), (val) => ({
    maxWidth: val === 'auto' ? 'none' : rem(container[val]),
  }))
}
