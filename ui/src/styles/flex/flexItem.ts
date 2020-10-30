import {getResponsiveProp} from '../helpers'
import {ThemeProps} from '../types'
import {FlexItemProps} from './types'

export function flexItem(props: FlexItemProps & ThemeProps) {
  const {theme} = props

  return getResponsiveProp(props.flex).map((flex, mqIndex) => {
    if (mqIndex === 0) return {flex}

    const mediaKey = `@media(min-width:${theme.media[mqIndex - 1]}px)`

    return {[mediaKey]: {flex}}
  })
}
