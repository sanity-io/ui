import {Property} from 'csstype'
import {CSSObject} from 'styled-components'
import {BoxStyleProps} from './types'

const BOX_SIZING: {[key: string]: Property.BoxSizing} = {
  content: 'content-box',
  border: 'border-box',
}

export function boxStyle({sizing}: BoxStyleProps): CSSObject {
  return {
    display: 'block',
    boxSizing: sizing && BOX_SIZING[sizing],
  }
}
