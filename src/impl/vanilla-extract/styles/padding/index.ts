import {_getArrayProp} from '@sanity/ui'
import {getMedia, getSpace} from '../helpers'
import {styles as paddingStyles} from './padding.css'
import {styles as paddingBottomStyles} from './paddingBottom.css'
import {styles as paddingLeftStyles} from './paddingLeft.css'
import {styles as paddingRightStyles} from './paddingRight.css'
import {styles as paddingTopStyles} from './paddingTop.css'
import {styles as paddingXStyles} from './paddingX.css'
import {styles as paddingYStyles} from './paddingY.css'

export function padding(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return paddingStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function paddingX(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return paddingXStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function paddingY(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return paddingYStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function paddingTop(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return paddingTopStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function paddingRight(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return paddingRightStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function paddingBottom(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return paddingBottomStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function paddingLeft(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return paddingLeftStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}
