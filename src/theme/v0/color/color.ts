import type {ThemeColorSchemeKey, ThemeColorSyntax} from '../../v2/color'
import type {ThemeColorGenericState} from './_generic'
import type {ThemeColorName} from './_system'
import type {ThemeColorBase} from './base'
import type {ThemeColorButton} from './button'
import type {ThemeColorCard} from './card'
import type {ThemeColorInput} from './input'
import type {ThemeColorMuted} from './muted'
import type {ThemeColorSelectable} from './selectable'
import type {ThemeColorSolid} from './solid'
import type {ThemeColorSpot} from './spot'

/**
 * @public
 * @deprecated Use `ThemeColor_v2` instead.
 */
export interface ThemeColor extends Partial<Omit<ThemeColorGenericState, 'muted'>> {
  base: ThemeColorBase
  button: ThemeColorButton
  card: ThemeColorCard
  dark: boolean
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
export type ThemeColorScheme = Record<ThemeColorName, ThemeColor>

/**
 * @public
 * @deprecated Use `ThemeColorSchemes_v2` instead.
 */
export type ThemeColorSchemes = Record<ThemeColorSchemeKey, ThemeColorScheme>
