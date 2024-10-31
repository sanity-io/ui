import {icons, type IconSymbol} from '@sanity/icons'
import {
  AVATAR_COLORS,
  AVATAR_SIZE,
  CONTAINER,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  RADIUS,
  SHADOW,
  SPACE,
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
} from '@sanity/ui/theme'

function fromEntries<K extends string | number | symbol, V>(entries: [K, V][]) {
  return Object.fromEntries(entries) as Record<K, V>
}

export const WORKSHOP_AVATAR_COLOR_OPTIONS = fromEntries(
  [undefined, ...AVATAR_COLORS].map((color) => [String(color), color]),
)

export const WORKSHOP_AVATAR_SIZE_OPTIONS = fromEntries(
  [undefined, ...AVATAR_SIZE].map((size) => [String(size), size]),
)

export const WORKSHOP_BADGE_TONE_OPTIONS = fromEntries(
  [undefined, ...THEME_COLOR_STATE_TONES].map((tone) => [String(tone), tone]),
)

export const WORKSHOP_BUTTON_MODE_OPTIONS = fromEntries(
  [undefined, ...THEME_COLOR_BUTTON_MODES].map((mode) => [String(mode), mode]),
)

export const WORKSHOP_BUTTON_TEXT_ALIGN_OPTIONS = {
  '': undefined,
  'Left': 'left',
  'Right': 'right',
  'Center': 'center',
} as const

export const WORKSHOP_BUTTON_TONE_OPTIONS = fromEntries(
  [undefined, ...THEME_COLOR_STATE_TONES].map((tone) => [String(tone), tone]),
)

export const WORKSHOP_CARD_AS_OPTIONS = {
  '': undefined,
  'div': 'div',
  'button': 'button',
  'span': 'span',
  'ol': 'ol',
  'pre': 'pre',
  'ul': 'ul',
} as const

export const WORKSHOP_CARD_TONE_OPTIONS = fromEntries(
  [undefined, 'inherit' as const, ...THEME_COLOR_CARD_TONES].map((tone) => [String(tone), tone]),
)

export const WORKSHOP_CODE_LANGUAGE_OPTIONS = {
  JSON: 'json',
  JavaScript: 'js',
  JSX: 'jsx',
  TypeScript: 'ts',
  TSX: 'tsx',
} as const

export const WORKSHOP_CODE_FONT_SIZE_OPTIONS = fromEntries(
  [undefined, ...FONT_CODE_SIZE].map((size) => [String(size), size]),
)

export const WORKSHOP_CONTAINER_WIDTH_OPTIONS = fromEntries(
  [undefined, ...CONTAINER].map((size) => [String(size), size]),
)

export const WORKSHOP_DIALOG_POSITION_OPTIONS = {
  '': undefined,
  'Fixed': 'fixed',
  'Absolute': 'absolute',
} as const

export const WORKSHOP_FLEX_DIRECTION_OPTIONS = {
  '': undefined,
  'Row': 'row',
  'Column': 'column',
} as const

export const WORKSHOP_FLEX_ALIGN_OPTIONS = {
  '': undefined,
  'baseline': 'baseline',
  'center': 'center',
  'flex-end': 'flex-end',
  'flex-start': 'flex-start',
  'stretch': 'stretch',
} as const

export const WORKSHOP_FLEX_JUSTIFY_OPTIONS = {
  '': undefined,
  'center': 'center',
  'flex-end': 'flex-end',
  'flex-start': 'flex-start',
  'space-around': 'space-around',
  'space-between': 'space-between',
  'space-evenly': 'space-evenly',
} as const

export const WORKSHOP_FONT_WEIGHT_OPTIONS = {
  '': undefined,
  'Regular': 'regular',
  'Medium': 'medium',
  'Semibold': 'semibold',
  'Bold': 'bold',
} as const

export const WORKSHOP_HEADING_FONT_SIZE_OPTIONS = fromEntries(
  [undefined, ...FONT_HEADING_SIZE].map((size) => [String(size), size]),
)

export const WORKSHOP_ICON_SYMBOL_OPTIONS = fromEntries<string, IconSymbol | undefined>(
  [undefined, ...Object.keys(icons)].map((key) => [key, key]) as [string, IconSymbol][],
)

export const WORKSHOP_LABEL_FONT_SIZE_OPTIONS = fromEntries(
  [undefined, ...FONT_LABEL_SIZE].map((size) => [String(size), size]),
)

export const WORKSHOP_PLACEMENT_OPTIONS = {
  '': undefined,
  'top': 'top',
  'top-start': 'top-start',
  'top-end': 'top-end',
  'right': 'right',
  'right-start': 'right-start',
  'right-end': 'right-end',
  'left': 'left',
  'left-start': 'left-start',
  'left-end': 'left-end',
  'bottom': 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
} as const

export const WORKSHOP_RADIUS_OPTIONS = fromEntries(
  [undefined, ...RADIUS].map((size) => [String(size), size]),
)

export const WORKSHOP_SHADOW_OPTIONS = fromEntries(
  [undefined, ...SHADOW].map((size) => [String(size), size]),
)

export const WORKSHOP_SPACE_OPTIONS = fromEntries(
  [undefined, ...SPACE].map((space) => [String(space), space]),
)

export const WORKSHOP_TEXT_ALIGN_OPTIONS = {
  '': undefined,
  'Initial': 'initial',
  'Left': 'left',
  'Right': 'right',
  'Center': 'center',
  'Justify': 'justify',
} as const

export const WORKSHOP_TEXT_INPUT_TYPE_OPTIONS = {
  '': undefined,
  'date': 'date',
  'datetime-local': 'datetime-local',
  'email': 'email',
  'month': 'month',
  'number': 'number',
  'password': 'password',
  'tel': 'tel',
  'time': 'time',
  'text': 'text',
  'week': 'week',
  'color': 'color',
} as const

export const WORKSHOP_TEXT_FONT_SIZE_OPTIONS = fromEntries(
  [undefined, ...FONT_TEXT_SIZE].map((size) => [size === undefined ? '' : String(size), size]),
)

export const WORKSHOP_TEXT_OVERFLOW_OPTIONS = {
  '': undefined,
  'Ellipsis': 'ellipsis',
} as const

export const WORKSHOP_TEXT_WEIGHT_OPTIONS = {
  '': undefined,
  'Regular': 'regular',
  'Medium': 'medium',
  'Semibold': 'semibold',
  'Bold': 'bold',
} as const

export const WORKSHOP_TOAST_STATUS_OPTIONS = {
  '': undefined,
  'info': 'info',
  'success': 'success',
  'warning': 'warning',
  'error': 'error',
} as const
