import {
  ThemeColor,
  ThemeColorBase,
  ThemeColorButtonModeKey,
  ThemeColorButtonStates,
  ThemeColorGenericState,
  ThemeColorInputState,
  ThemeColorMuted,
  ThemeColorMutedTone,
  ThemeColorName,
  ThemeColorScheme,
  ThemeColorSchemes,
  ThemeColorSolid,
  ThemeColorSolidTone,
  ThemeColorSpotKey,
  ThemeColorSyntax,
  ThemeColorToneKey,
} from '../../../system'
import {createSelectableTones} from './_selectable/createSelectableTones'
import {createSolidTones} from './_solid/createSolidTones'
import {createButtonModes} from './button/createButtonModes'
import {createCardStates} from './card/createCardStates'
import {defaultOpts} from './defaults'
import {createInputModes} from './input/createInputModes'
import {createMutedTones} from './muted/createMuted'
import {createSpot} from './spot/createSpot'

/**
 * @public
 * @deprecated Use `buildColorTheme` instead.
 */
export interface ThemeColorBuilderOpts {
  // oxlint-disable-next-line no-deprecated
  base: (opts: {dark: boolean; name: ThemeColorName}) => ThemeColorBase
  solid: (opts: {
    // oxlint-disable-next-line no-deprecated
    base: ThemeColorBase
    dark: boolean
    // oxlint-disable-next-line no-deprecated
    tone: ThemeColorName
    // oxlint-disable-next-line no-deprecated
    name: ThemeColorName
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
    // oxlint-disable-next-line no-deprecated
  }) => ThemeColorGenericState
  muted: (opts: {
    // oxlint-disable-next-line no-deprecated
    base: ThemeColorBase
    dark: boolean
    // oxlint-disable-next-line no-deprecated
    tone: ThemeColorToneKey
    // oxlint-disable-next-line no-deprecated
    name: ThemeColorName
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
    // oxlint-disable-next-line no-deprecated
  }) => ThemeColorGenericState
  card: (opts: {
    // oxlint-disable-next-line no-deprecated
    base: ThemeColorBase
    dark: boolean
    // oxlint-disable-next-line no-deprecated
    muted: ThemeColorMuted
    // oxlint-disable-next-line no-deprecated
    name: ThemeColorName
    // oxlint-disable-next-line no-deprecated
    solid: ThemeColorSolid
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
    // oxlint-disable-next-line no-deprecated
  }) => ThemeColorGenericState
  button: (opts: {
    dark: boolean
    mode: ThemeColorButtonModeKey
    // oxlint-disable-next-line no-deprecated
    base: ThemeColorBase
    // oxlint-disable-next-line no-deprecated
    solid: ThemeColorSolidTone
    // oxlint-disable-next-line no-deprecated
    muted: ThemeColorMutedTone
    // oxlint-disable-next-line no-deprecated
  }) => ThemeColorButtonStates
  input: (opts: {
    // oxlint-disable-next-line no-deprecated
    base: ThemeColorBase
    // oxlint-disable-next-line no-deprecated
    solid: ThemeColorSolidTone
    // oxlint-disable-next-line no-deprecated
    muted: ThemeColorMutedTone
    dark: boolean
    mode: 'default' | 'invalid'
    state: 'enabled' | 'disabled' | 'hovered' | 'readOnly'
    // oxlint-disable-next-line no-deprecated
  }) => ThemeColorInputState
  selectable: (opts: {
    dark: boolean
    // oxlint-disable-next-line no-deprecated
    base: ThemeColorBase
    // oxlint-disable-next-line no-deprecated
    solid: ThemeColorSolid
    // oxlint-disable-next-line no-deprecated
    muted: ThemeColorMuted
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
    tone: 'default' | 'primary' | 'positive' | 'caution' | 'critical'
    // oxlint-disable-next-line no-deprecated
  }) => ThemeColorGenericState
  // oxlint-disable-next-line no-deprecated
  syntax: (opts: {base: ThemeColorBase; dark: boolean}) => ThemeColorSyntax
  // oxlint-disable-next-line no-deprecated
  spot: (opts: {base: ThemeColorBase; dark: boolean; key: ThemeColorSpotKey}) => string
}

/**
 * @public
 * @deprecated Use `ThemeConfig` instead.
 */
// oxlint-disable-next-line no-deprecated
export type PartialThemeColorBuilderOpts = Partial<ThemeColorBuilderOpts>

/**
 * @public
 * @deprecated Use `buildColorTheme` instead.
 */
export function createColorTheme(
  // oxlint-disable-next-line no-deprecated
  partialOpts: PartialThemeColorBuilderOpts = {},
  // oxlint-disable-next-line no-deprecated
): ThemeColorSchemes {
  // oxlint-disable-next-line no-deprecated
  const builders: ThemeColorBuilderOpts = {...defaultOpts, ...partialOpts}

  return {
    light: _createColorScheme(builders, false),
    dark: _createColorScheme(builders, true),
  }
}

/**
 * @internal
 */
// oxlint-disable-next-line no-deprecated
function _createColorScheme(opts: ThemeColorBuilderOpts, dark: boolean): ThemeColorScheme {
  return {
    default: _createColor(opts, dark, 'default'),
    transparent: _createColor(opts, dark, 'transparent'),
    primary: _createColor(opts, dark, 'primary'),
    positive: _createColor(opts, dark, 'positive'),
    caution: _createColor(opts, dark, 'caution'),
    critical: _createColor(opts, dark, 'critical'),
  }
}

/**
 * @internal
 */
function _createColor(
  // oxlint-disable-next-line no-deprecated
  opts: ThemeColorBuilderOpts,
  dark: boolean,
  // oxlint-disable-next-line no-deprecated
  name: ThemeColorName,
  // oxlint-disable-next-line no-deprecated
): ThemeColor {
  const base = opts.base({dark, name})
  const solid = createSolidTones(opts, base, dark, name)
  const muted = createMutedTones(opts, base, dark, name)

  return {
    base,
    button: createButtonModes(opts, base, dark, solid, muted),
    card: createCardStates(opts, base, dark, name, solid, muted),
    dark,
    input: createInputModes(opts, base, dark, solid, muted),
    selectable: createSelectableTones(opts, base, dark, solid, muted),
    spot: createSpot(opts, base, dark),
    syntax: opts.syntax({base, dark}),
    solid,
    muted,
  }
}
