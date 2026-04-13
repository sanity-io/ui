import {icons, type IconSymbol} from '@sanity/icons'

function fromEntries<K extends string | number | symbol, V>(entries: [K, V][]) {
  return Object.fromEntries(entries) as Record<K, V>
}

export const WORKSHOP_AVATAR_SRC =
  'https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4'

export const WORKSHOP_BUTTON_TEXT_ALIGN_OPTIONS = {
  '': undefined,
  'Left': 'left',
  'Right': 'right',
  'Center': 'center',
} as const

export const WORKSHOP_CARD_AS_OPTIONS = {
  '': undefined,
  'div': 'div',
  'button': 'button',
  'span': 'span',
  'ol': 'ol',
  'pre': 'pre',
  'ul': 'ul',
} as const

export const WORKSHOP_CODE_LANGUAGE_OPTIONS = {
  JSON: 'json',
  JavaScript: 'js',
  JSX: 'jsx',
  TypeScript: 'ts',
  TSX: 'tsx',
} as const

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

export const WORKSHOP_ICON_SYMBOL_OPTIONS: Record<string, IconSymbol | undefined> = fromEntries(
  [undefined, ...Object.keys(icons)].map((key) => [key, key]) as [string, IconSymbol][],
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

export const WORKSHOP_TEXT_ALIGN_OPTIONS = {
  '': undefined,

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
