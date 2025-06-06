import type {ColorHues, ColorTint} from '@sanity/color'

import type {
  ThemeFocusRing,
  ThemeFontWeight,
  ThemeFontWeightKey,
  ThemeLayer,
  ThemeShadow,
} from '../v0'
import type {ThemeAvatar_v2, ThemeConfig, ThemeInput_v2} from '../v2'
import type {
  AVATAR_SIZE,
  CONTAINER,
  CONTAINER_SCALE,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  RADIUS,
  SHADOW,
  SPACE,
} from './_constants'
import type {ThemeColor_v3} from './color'
import type {PartialTokens, Tokens} from './tokens'

/** @public */
export type AvatarSize = (typeof AVATAR_SIZE)[number]

/** @public */
export type ContainerScale = (typeof CONTAINER_SCALE)[number]

/** @public */
export type ContainerWidth = (typeof CONTAINER)[number]

/** @public */
export type Radius = (typeof RADIUS)[number] // | 'full'

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

/** @public */
export type ThemeEntry = [`--${string}`, string]

/** @public */
export interface ThemeOptions {
  v2?: ThemeConfig
  tokens?: PartialTokens<Tokens>
}

/** @public */
export interface ThemePalette_v3 {
  black: ColorTint
  white: ColorTint
  hues: ColorHues
}

/** @public */
export interface ThemeFontSize_v3 {
  ascenderHeight: number
  descenderHeight: number
  fontSize: number
  iconSize: number
  letterSpacing: number
  lineHeight: number
  customIconSize: number
}

/** @public */
export interface ThemeFont_v3 {
  family: string
  featureSettings?: string
  weight: ThemeFontWeight
  scale: ThemeFontSize_v3[]
}

/** @public */
export interface ThemeFonts_v3 {
  code: ThemeFont_v3
  heading: ThemeFont_v3
  label: ThemeFont_v3
  text: ThemeFont_v3
}

/**
 * Supersedes `RootTheme` and `RootTheme_v2`.
 *
 * @public
 */
export interface Theme_v3 {
  _version: 3
  _tokens: Tokens
  avatar: ThemeAvatar_v2
  button: {
    border: {width: number}
    focusRing: ThemeFocusRing
    textWeight: ThemeFontWeightKey
  }
  card: {
    border: {width: number}
    focusRing: ThemeFocusRing
    shadow: {outline: number}
  }
  color: ThemeColor_v3
  // color: ThemeColorSchemes_v2
  container: number[]
  font: ThemeFonts_v3
  input: ThemeInput_v2
  layer: ThemeLayer
  media: number[]
  palette: ThemePalette_v3
  radius: Record<Radius, number>
  // shadow: Array<ThemeShadow | null>
  shadow: Record<Shadow, ThemeShadow | undefined>
  space: Record<Space, number>
}
