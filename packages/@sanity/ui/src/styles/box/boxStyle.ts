import {Property} from 'csstype'
import {css} from 'styled-components'
import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveBoxStyleProps} from './types'

const BOX_SIZING: {[key: string]: Property.BoxSizing} = {
  content: 'content-box',
  border: 'border-box',
}

const BOX_HEIGHT = {
  stretch: 'stretch',
  fill: '100%',
}

export function boxStyle() {
  return css`
    &[data-as='ul'],
    &[data-as='ol'] {
      list-style: none;
    }
  `
}

export function responsiveBoxStyle() {
  return [
    responsiveBoxSizingStyle,
    responsiveBoxHeightStyle,
    responsiveBoxOverflowStyle,
    responsiveBoxDisplayStyle,
  ]
}

function responsiveBoxDisplayStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$display), (display) => ({
    '&:not([hidden])': {display},
  }))
}

function responsiveBoxSizingStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$sizing), (sizing) => ({
    boxSizing: BOX_SIZING[sizing],
  }))
}

function responsiveBoxHeightStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$height), (height) => ({
    height: BOX_HEIGHT[height],
  }))
}

function responsiveBoxOverflowStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$overflow), (overflow) => ({
    overflow,
  }))
}
