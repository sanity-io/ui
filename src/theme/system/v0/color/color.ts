import {ThemeColorCardToneKey, ThemeColorSchemeKey, ThemeColorSyntax} from '../../color'
import {ThemeColorGenericState} from './_generic'
import {ThemeColorBase} from './base'
import {ThemeColorButton} from './button'
import {ThemeColorCard} from './card'
import {ThemeColorInput} from './input'
import {ThemeColorMuted} from './muted'
import {ThemeColorSelectable} from './selectable'
import {ThemeColorSolid} from './solid'
import {ThemeColorSpot} from './spot'

/**
 * @public
 * @deprecated Use `ThemeColor_v2` instead.
 */
export interface ThemeColor extends Partial<Omit<ThemeColorGenericState, 'muted'>> {
  base: ThemeColorBase
  button: ThemeColorButton
  card: ThemeColorCard
  dark: boolean
  focusRing?: string
  input: ThemeColorInput
  muted: ThemeColorMuted
  selectable?: ThemeColorSelectable
  solid: ThemeColorSolid
  spot: ThemeColorSpot
  syntax: ThemeColorSyntax
}

/**
 * @public
 * @deprecated Use `ThemeColorScheme_v2` instead.
 */
export type ThemeColorScheme = Record<ThemeColorCardToneKey, ThemeColor>

/**
 * @public
 * @deprecated Use `ThemeColorSchemes_v2` instead.
 */
export type ThemeColorSchemes = Record<ThemeColorSchemeKey, ThemeColorScheme>
