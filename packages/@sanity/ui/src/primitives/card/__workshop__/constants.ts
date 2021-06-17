import {CardTone} from '@sanity/ui'

export const AS_OPTIONS: {[key: string]: 'div' | 'button' | 'span' | 'ol' | 'pre' | 'ul'} = {
  'DIV (default)': 'div',
  BUTTON: 'button',
  SPAN: 'span',
  OL: 'ol',
  PRE: 'pre',
  UL: 'ul',
}

export const SPACE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
}

export const RADIUS_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
}

export const SHADOW_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
}

export const CARD_TONE_OPTIONS: {[key: string]: CardTone} = {
  Default: 'default',
  Inherit: 'inherit',
  Transparent: 'transparent',
  Primary: 'primary',
  Positive: 'positive',
  Caution: 'caution',
  Critical: 'critical',
}
