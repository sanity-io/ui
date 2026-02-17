import {COLOR_HUES} from '@sanity/color'

// re-export
export {
  /** @public */
  type ColorHueKey as Hue,
  /** @public */
  COLOR_HUES as HUES,
  /** @public */
  type ColorTintKey as Tint,
  /** @public */
  COLOR_TINTS as TINTS,
} from '@sanity/color'

/**
 * Available card tone mode values for the `_cardTone` collection.
 *
 * @remarks
 * Card tones represent surface-level context:
 * - `default` - Default surface (neutral background)
 * - `neutral` - Neutral informational surface
 * - `primary` - Primary/brand surface
 * - `suggest` - Suggested action surface (blue)
 * - `positive` - Success/positive surface (green)
 * - `caution` - Warning surface (yellow/orange)
 * - `critical` - Error/critical surface (red)
 * - `transparent` - Transparent surface
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
 * @remarks
 * Represents global appearance:
 * - `light` - Light mode
 * - `dark` - Dark mode
 *
 * @public
 */
export const COLOR_SCHEMES = ['light', 'dark'] as const

// /** @internal */
// export const COLOR_STATES = ['enabled', 'hovered', 'pressed', 'selected', 'disabled'] as const

/**
 * Available color variant types.
 *
 * @remarks
 * - `tinted` - Subtle, tinted backgrounds with stronger foregrounds
 * - `solid` - Stronger, solid backgrounds with lighter foregrounds
 *
 * @public
 */
export const COLOR_VARIANTS = ['tinted', 'solid'] as const

/**
 * Available element tone mode values for the `_elementTone` collection.
 *
 * @remarks
 * Element tones represent element-level intent (no `transparent` tone):
 * - `default` - Default intent
 * - `neutral` - Neutral informational intent
 * - `primary` - Primary/brand intent
 * - `suggest` - Suggested action intent (blue)
 * - `positive` - Success/positive intent (green)
 * - `caution` - Warning intent (yellow/orange)
 * - `critical` - Error/critical intent (red)
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

/** @internal */
export const CODE_TOKEN_KEYS = [
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
