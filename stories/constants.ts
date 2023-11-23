import {
  BadgeMode,
  BadgeTone,
  ButtonMode,
  ButtonTone,
  CardTone,
  Placement,
  Radius,
} from '../src/core/types'
import {studioTheme} from '../src/theme'

export const AVATAR_SRC =
  'https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4'

export const BADGE_MODES: BadgeMode[] = ['default', 'outline']

export const BADGE_TONES: BadgeTone[] = ['default', 'primary', 'positive', 'caution', 'critical']

export const BUTTON_MODES: ButtonMode[] = ['default', 'ghost', 'bleed']

export const BUTTON_TONES: ButtonTone[] = ['default', 'primary', 'positive', 'caution', 'critical']

export const CARD_TONES: CardTone[] = [
  'default',
  'transparent',
  'primary',
  'positive',
  'caution',
  'critical',
]

export const PLACEMENT_OPTIONS: Placement[] = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
  'bottom',
  'bottom-start',
  'bottom-end',
]

export const RADII: Radius[] = [...Array(studioTheme.radius.length).keys(), 'full']
