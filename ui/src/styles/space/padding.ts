import {ThemeProps} from '../types'
import {getResponsiveSpace} from './helpers'

export interface PaddingProps {
  padding?: number[]
  paddingX?: number[]
  paddingY?: number[]
  paddingTop?: number[]
  paddingRight?: number[]
  paddingBottom?: number[]
  paddingLeft?: number[]
}

export function padding(props: PaddingProps & ThemeProps) {
  const {theme} = props

  return [
    // {padding: 0},
    getResponsiveSpace(theme, ['padding'], props.padding),
    getResponsiveSpace(theme, ['paddingLeft', 'paddingRight'], props.paddingX),
    getResponsiveSpace(theme, ['paddingTop', 'paddingBottom'], props.paddingY),
    getResponsiveSpace(theme, ['paddingTop'], props.paddingTop),
    getResponsiveSpace(theme, ['paddingRight'], props.paddingRight),
    getResponsiveSpace(theme, ['paddingBottom'], props.paddingBottom),
    getResponsiveSpace(theme, ['paddingLeft'], props.paddingLeft),
  ]
}
