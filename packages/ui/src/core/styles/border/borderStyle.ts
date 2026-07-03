import {CSSObject, getTheme_v2} from '@sanity/ui/theme'

import {_responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveBorderStyleProps} from './types'

export function responsiveBorderStyle(): Array<
  (props: ResponsiveBorderStyleProps & ThemeProps) => CSSObject[]
> {
  return [border, borderTop, borderRight, borderBottom, borderLeft]
}

function border(props: ResponsiveBorderStyleProps & ThemeProps) {
  const {card, media} = getTheme_v2(props.theme)
  const borderStyle = `${card.border?.width ?? 1}px solid var(--card-border-color)`

  return _responsive(media, props.$border, (value) =>
    value ? {'&&': {border: borderStyle}} : {'&&': {border: 0}},
  )
}

function borderTop(props: ResponsiveBorderStyleProps & ThemeProps) {
  const {card, media} = getTheme_v2(props.theme)
  const borderStyle = `${card.border?.width ?? 1}px solid var(--card-border-color)`

  return _responsive(media, props.$borderTop, (value) =>
    value ? {'&&': {borderTop: borderStyle}} : {'&&': {borderTop: 0}},
  )
}

function borderRight(props: ResponsiveBorderStyleProps & ThemeProps) {
  const {card, media} = getTheme_v2(props.theme)
  const borderStyle = `${card.border?.width ?? 1}px solid var(--card-border-color)`

  return _responsive(media, props.$borderRight, (value) =>
    value ? {'&&': {borderRight: borderStyle}} : {'&&': {borderRight: 0}},
  )
}

function borderBottom(props: ResponsiveBorderStyleProps & ThemeProps) {
  const {card, media} = getTheme_v2(props.theme)
  const borderStyle = `${card.border?.width ?? 1}px solid var(--card-border-color)`

  return _responsive(media, props.$borderBottom, (value) =>
    value ? {'&&': {borderBottom: borderStyle}} : {'&&': {borderBottom: 0}},
  )
}

function borderLeft(props: ResponsiveBorderStyleProps & ThemeProps) {
  const {card, media} = getTheme_v2(props.theme)
  const borderStyle = `${card.border?.width ?? 1}px solid var(--card-border-color)`

  return _responsive(media, props.$borderLeft, (value) =>
    value ? {'&&': {borderLeft: borderStyle}} : {'&&': {borderLeft: 0}},
  )
}
