import {COLOR_HUES} from '@sanity/color'

// re-export
export {
  /** @public */
  COLOR_HUES as HUES,
  /** @public */
  COLOR_TINTS as TINTS,
} from '@sanity/color'

/** @internal */
export const _CODE_TOKEN_KEYS = [
  'atrule',
  'attrName',
  'attrValue',
  'attribute',
  'boolean',
  'builtin',
  'cdata',
  'char',
  'class',
  'className',
  'comment',
  'constant',
  'deleted',
  'doctype',
  'entity',
  'function',
  'hexcode',
  'id',
  'important',
  'inserted',
  'keyword',
  'number',
  'operator',
  'prolog',
  'property',
  'pseudoClass',
  'pseudoElement',
  'punctuation',
  'regex',
  'selector',
  'string',
  'symbol',
  'tag',
  'unit',
  'url',
  'variable',
] as const

/**
 * Available avatar color mode values for the `_avatarColor` collection.
 *
 * @remarks
 * Avatar colors map to color hues: gray, red, orange, yellow, green,
 * cyan, blue, purple, magenta.
 *
 * @public
 */
export const AVATAR_COLORS = COLOR_HUES

/** @public */
export const AVATAR_SIZE = [0, 1, 2, 3] as const

/** @beta */
export const BG_PATTERNS = ['checkered', 'halftone', 'grid'] as const

/** @public */
export const BORDER_STYLE = ['default', 'muted', 'none'] as const

/** @public */
export const BORDER_WIDTH = [0, 1, 2] as const

/** @public */
export const BUTTON_MODES = ['default', 'ghost', 'bleed'] as const

/**
 * Available card tone mode values for the `_cardTone` collection.
 *
 * @public
 */
export const CARD_TONES = [
  'default',
  'neutral',
  'primary',
  'suggest',
  'positive',
  'caution',
  'critical',
  'transparent',
] as const

/**
 * Available color scheme mode values for the `_colorScheme` collection.
 *
 * @public
 */
export const COLOR_SCHEMES = ['light', 'dark'] as const

/**
 * Available color variant types.
 *
 * @public
 */
export const COLOR_VARIANTS = ['tinted', 'solid'] as const

/** @public */
export const CONTAINER_SCALE = [0, 1, 2, 3, 4, 5] as const

/** @public */
export const CONTAINER: [...typeof CONTAINER_SCALE, 'auto'] = [...CONTAINER_SCALE, 'auto']

/**
 * Available element tone mode values for the `_elementTone` collection.
 *
 * @public
 */
export const ELEMENT_TONES = [
  'default',
  'neutral',
  'primary',
  'suggest',
  'positive',
  'caution',
  'critical',
] as const

/** @public */
export const FONT_CODE_SIZE = [0, 1, 2, 3, 4] as const

/** @public */
export const FONT_HEADING_SIZE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const

/** @public */
export const FONT_LABEL_SIZE = [0, 1, 2, 3, 4, 5] as const

/** @public */
export const FONT_TEXT_SIZE = [0, 1, 2, 3, 4] as const

/** @public */
export const FONT_WEIGHT = ['regular', 'medium', 'semibold', 'bold'] as const

/** @public */
export const RADIUS = [0, 1, 2, 3, 4, 5, 6, 'full'] as const

/** @public */
export const SHADOW = [0, 1, 2, 3, 4, 5] as const

/** @public */
export const SPACE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const
