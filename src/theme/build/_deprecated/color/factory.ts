import {
  ThemeColorGenericState,
  ThemeColorBase,
  ThemeColorButtonModeKey,
  ThemeColorButtonStates,
  ThemeColorInputState,
  ThemeColorMuted,
  ThemeColorMutedTone,
  ThemeColorSolid,
  ThemeColorSolidTone,
  ThemeColorSyntax,
  ThemeColorName,
  ThemeColorScheme,
  ThemeColorSchemes,
  ThemeColor,
  ThemeColorToneKey,
  ThemeColorSpotKey,
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
  base: (opts: {dark: boolean; name: ThemeColorName}) => ThemeColorBase
  solid: (opts: {
    base: ThemeColorBase
    dark: boolean
    tone: ThemeColorToneKey
    name: ThemeColorName
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorGenericState
  muted: (opts: {
    base: ThemeColorBase
    dark: boolean
    tone: ThemeColorToneKey
    name: ThemeColorName
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorGenericState
  card: (opts: {
    base: ThemeColorBase
    dark: boolean
    muted: ThemeColorMuted
    name: ThemeColorName
    solid: ThemeColorSolid
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorGenericState
  button: (opts: {
    dark: boolean
    mode: ThemeColorButtonModeKey
    base: ThemeColorBase
    solid: ThemeColorSolidTone
    muted: ThemeColorMutedTone
  }) => ThemeColorButtonStates
  input: (opts: {
    base: ThemeColorBase
    solid: ThemeColorSolidTone
    muted: ThemeColorMutedTone
    dark: boolean
    mode: 'default' | 'invalid'
    state: 'enabled' | 'disabled' | 'hovered' | 'readOnly'
  }) => ThemeColorInputState
  selectable: (opts: {
    dark: boolean
    base: ThemeColorBase
    solid: ThemeColorSolid
    muted: ThemeColorMuted
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
    tone: 'default' | 'primary' | 'positive' | 'caution' | 'critical'
  }) => ThemeColorGenericState
  syntax: (opts: {base: ThemeColorBase; dark: boolean}) => ThemeColorSyntax
  spot: (opts: {base: ThemeColorBase; dark: boolean; key: ThemeColorSpotKey}) => string
}

/**
 * @public
 * @deprecated Use `ThemeConfig` instead.
 */
export type PartialThemeColorBuilderOpts = Partial<ThemeColorBuilderOpts>

/**
 * @public
 * @deprecated Use `buildColorTheme` instead.
 */
export function createColorTheme(
  partialOpts: PartialThemeColorBuilderOpts = {},
): ThemeColorSchemes {
  const builders: ThemeColorBuilderOpts = {...defaultOpts, ...partialOpts}

  return {
    light: _createColorScheme(builders, false),
    dark: _createColorScheme(builders, true),
  }
}

/**
 * @internal
 */
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
  opts: ThemeColorBuilderOpts,
  dark: boolean,
  name: ThemeColorName,
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
