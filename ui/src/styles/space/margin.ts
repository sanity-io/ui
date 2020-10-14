import {ThemeProps} from '../types'
import {getResponsiveSpace} from './helpers'

export interface MarginProps {
  margin?: number[]
  marginX?: number[]
  marginY?: number[]
  marginTop?: number[]
  marginRight?: number[]
  marginBottom?: number[]
  marginLeft?: number[]
}

export function margin(props: MarginProps & ThemeProps) {
  const {theme} = props

  return [
    // {margin: 0},
    getResponsiveSpace(theme, ['margin'], props.margin),
    getResponsiveSpace(theme, ['marginLeft', 'marginRight'], props.marginX),
    getResponsiveSpace(theme, ['marginTop', 'marginBottom'], props.marginY),
    getResponsiveSpace(theme, ['marginTop'], props.marginTop),
    getResponsiveSpace(theme, ['marginRight'], props.marginRight),
    getResponsiveSpace(theme, ['marginBottom'], props.marginBottom),
    getResponsiveSpace(theme, ['marginLeft'], props.marginLeft),
  ]
}
