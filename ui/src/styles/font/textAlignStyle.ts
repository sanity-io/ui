import {TextAlign} from '../../types'
import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'

export function responsiveTextAlignStyle(props: {align?: TextAlign | TextAlign[]} & ThemeProps) {
  const {theme} = props

  return responsive(theme.sanity.media, getResponsiveProp(props.align), (textAlign) => {
    return {textAlign}
  })
}
