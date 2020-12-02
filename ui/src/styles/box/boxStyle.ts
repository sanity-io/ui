import {Property} from 'csstype'
import {CSSObject} from 'styled-components'
import {Theme} from '../../theme'
import {getResponsiveProp, responsive} from '../helpers'
import {BoxStyleProps} from './types'

const BOX_SIZING: {[key: string]: Property.BoxSizing} = {
  content: 'content-box',
  border: 'border-box',
}

const HEIGHTS = {
  stretch: 'stretch',
  fill: '100%',
}

export function boxStyle({height, overflow, sizing}: BoxStyleProps & {theme: Theme}) {
  return [
    {
      boxSizing: sizing && BOX_SIZING[sizing],
      height: height && HEIGHTS[height],
      overflow,
    } as CSSObject,
    responsiveBoxDisplayStyle,
  ]
}

function responsiveBoxDisplayStyle({display, theme}: BoxStyleProps & {theme: Theme}) {
  return responsive(
    theme.sanity.media,
    getResponsiveProp(display).map((val) => ({'&:not([hidden])': {display: val}}))
  )
}
