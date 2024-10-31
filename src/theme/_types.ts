import {
  AVATAR_SIZE,
  CONTAINER,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  RADIUS,
  SHADOW,
  SPACE,
} from './_constants'

/** @public */
export type AvatarSize = (typeof AVATAR_SIZE)[number]

/** @public */
export type ContainerWidth = (typeof CONTAINER)[number] | 'auto' | 'fill'

/** @public */
export type Radius = (typeof RADIUS)[number] | 'full'

/** @public */
export type Space = (typeof SPACE)[number]

/** @public */
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold'

/** @public */
export type FontCodeSize = (typeof FONT_CODE_SIZE)[number]

/** @public */
export type FontHeadingSize = (typeof FONT_HEADING_SIZE)[number]

/** @public */
export type FontLabelSize = (typeof FONT_LABEL_SIZE)[number]

/** @public */
export type FontTextSize = (typeof FONT_TEXT_SIZE)[number]

/** @public */
export type Shadow = (typeof SHADOW)[number]
