import {ThemeColorSchemeKey, ThemeColorSyntax} from '../../color'
import {ThemeColorGenericState} from './_generic'
import {ThemeColorName} from './_system'
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
// oxlint-disable-next-line no-deprecated
export interface ThemeColor extends Partial<Omit<ThemeColorGenericState, 'muted'>> {
  // oxlint-disable-next-line no-deprecated
  base: ThemeColorBase
  // oxlint-disable-next-line no-deprecated
  button: ThemeColorButton
  // oxlint-disable-next-line no-deprecated
  card: ThemeColorCard
  dark: boolean
  // oxlint-disable-next-line no-deprecated
  input: ThemeColorInput
  // oxlint-disable-next-line no-deprecated
  muted: ThemeColorMuted
  // oxlint-disable-next-line no-deprecated
  selectable?: ThemeColorSelectable
  // oxlint-disable-next-line no-deprecated
  solid: ThemeColorSolid
  // oxlint-disable-next-line no-deprecated
  spot: ThemeColorSpot
  syntax: ThemeColorSyntax
}

/**
 * @public
 * @deprecated Use `ThemeColorScheme_v2` instead.
 */
// oxlint-disable-next-line no-deprecated
export type ThemeColorScheme = Record<ThemeColorName, ThemeColor>

/**
 * @public
 * @deprecated Use `ThemeColorSchemes_v2` instead.
 */
// oxlint-disable-next-line no-deprecated
export type ThemeColorSchemes = Record<ThemeColorSchemeKey, ThemeColorScheme>
