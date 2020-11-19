import {Property} from 'csstype'
import {CSSObject} from 'styled-components'
import {BoxStyleProps} from './types'

const BOX_SIZING: {[key: string]: Property.BoxSizing} = {
  content: 'content-box',
  border: 'border-box',
}

const HEIGHTS = {
  stretch: 'stretch',
  fill: '100%',
}

export function boxStyle({height, overflow, sizing}: BoxStyleProps): CSSObject {
  return {
    boxSizing: sizing && BOX_SIZING[sizing],
    display: 'block',
    height: height && HEIGHTS[height],
    overflow,
  }
}
