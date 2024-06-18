import {_getArrayProp} from '@sanity/ui'
import {getMedia, getSpace} from '../helpers'
import {styles as marginStyles} from './margin.css'
import {styles as marginBottomStyles} from './marginBottom.css'
import {styles as marginLeftStyles} from './marginLeft.css'
import {styles as marginRightStyles} from './marginRight.css'
import {styles as marginTopStyles} from './marginTop.css'
import {styles as marginXStyles} from './marginX.css'
import {styles as marginYStyles} from './marginY.css'

export function margin(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return marginStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function marginX(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return marginXStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function marginY(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return marginYStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function marginTop(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return marginTopStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function marginRight(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return marginRightStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function marginBottom(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return marginBottomStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}

export function marginLeft(value?: number | number[]): string[] {
  return _getArrayProp(value).map((v, i) => {
    return marginLeftStyles[`${getSpace(v)}_${getMedia(i)}`]
  })
}
