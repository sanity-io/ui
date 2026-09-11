import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_responsive, _ruleSet} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveBorderStyleProps} from './types'

const RULES = _ruleSet(border, borderTop, borderRight, borderBottom, borderLeft)

export function responsiveBorderStyle(): CSSObject[] {
  return RULES
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
