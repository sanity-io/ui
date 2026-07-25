// oxlint-disable no-deprecated -- deprecated API members are re-exported for backwards compatibility
// This entry point deliberately avoids `export *` barrels: every member of
// the public API is re-exported here directly from the module that defines
// it, keeping module graphs small for bundlers, test runners and runtimes.
export {
  createColorTheme,
  type PartialThemeColorBuilderOpts,
  type ThemeColorBuilderOpts,
} from '../src/theme/build/_deprecated/color/factory'
export {buildTheme} from '../src/theme/build/buildTheme'
export {mix} from '../src/theme/build/lib/color-fns/blend/mix'
export {multiply} from '../src/theme/build/lib/color-fns/blend/multiply'
export {screen} from '../src/theme/build/lib/color-fns/blend/screen'
export {getContrastRatio} from '../src/theme/build/lib/color-fns/contrastRatio'
export {
  hexToRgb,
  hslToRgb,
  rgbaToRGBA,
  rgbToHex,
  rgbToHsl,
} from '../src/theme/build/lib/color-fns/convert'
export {parseColor} from '../src/theme/build/lib/color-fns/parse'
export {rgba} from '../src/theme/build/lib/color-fns/rgba'
export type {HSL, RGB, RGBA} from '../src/theme/build/lib/color-fns/types'
export {
  isColorConfigBaseKey,
  isColorConfigBaseTone,
  isColorConfigBlendKey,
  isColorConfigStateKey,
  isColorConfigStateTone,
  isColorOpacityValue,
  isColorTokenValue,
  isColorValue,
} from '../src/theme/config/helpers'
export {
  COLOR_CONFIG_AVATAR_COLORS,
  COLOR_CONFIG_BLEND_KEYS,
  COLOR_CONFIG_CARD_KEYS,
  COLOR_CONFIG_CARD_TONES,
  COLOR_CONFIG_INPUT_MODES,
  COLOR_CONFIG_INPUT_STATES,
  COLOR_CONFIG_STATE_KEYS,
  COLOR_CONFIG_STATE_TONES,
  COLOR_CONFIG_STATES,
  type ColorBlendModeTokenValue,
  type ColorConfigAvatarColor,
  type ColorConfigBlendKey,
  type ColorConfigCardKey,
  type ColorConfigCardTone,
  type ColorConfigInputMode,
  type ColorConfigInputState,
  type ColorConfigOpacityValue,
  type ColorConfigState,
  type ColorConfigStateKey,
  type ColorConfigStateTone,
  type ColorConfigValue,
  type ThemeColorTokenValue,
} from '../src/theme/config/system'
export type {
  ThemeColorAvatarHueTokens,
  ThemeColorAvatarTokens,
  ThemeColorBadgeTokens,
  ThemeColorBadgeToneTokens,
  ThemeColorBaseTokens,
  ThemeColorButtonTokens,
  ThemeColorInputStateTokens,
  ThemeColorInputTokens,
  ThemeColorStatesTokens,
  ThemeColorStateTokens,
  ThemeColorTokens,
} from '../src/theme/config/tokens/color/types'
export {parseTokenKey} from '../src/theme/config/tokens/parseTokenKey'
export {parseTokenValue} from '../src/theme/config/tokens/parseTokenValue'
export type {
  TokenBaseKeyNode,
  TokenBlendModeValueNode,
  TokenButtonKeyNode,
  TokenColorValueNode,
  TokenHueValueNode,
  TokenKeyNode,
  TokenValueNode,
} from '../src/theme/config/tokens/types'
export type {ThemeColorPalette, ThemeConfig} from '../src/theme/config/types'
export {getScopedTheme} from '../src/theme/getScopedTheme'
export type {ThemeAvatar_v2} from '../src/theme/system/avatar'
export {
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_BLEND_MODES,
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_INPUT_MODES,
  THEME_COLOR_INPUT_STATES,
  THEME_COLOR_SCHEMES,
  THEME_COLOR_STATE_TONES,
  THEME_COLOR_STATES,
} from '../src/theme/system/color/_constants'
export {
  isColorBlendModeValue,
  isColorButtonMode,
  isColorHueKey,
  isColorTintKey,
} from '../src/theme/system/color/_helpers'
export type {
  ThemeColorAvatarColorKey,
  ThemeColorBlendModeKey,
  ThemeColorButtonModeKey,
  ThemeColorCardToneKey,
  ThemeColorInputModeKey,
  ThemeColorInputStateKey,
  ThemeColorSchemeKey,
  ThemeColorStateKey,
  ThemeColorStateToneKey,
} from '../src/theme/system/color/_system'
export type {ThemeColorAvatar_v2, ThemeColorAvatarHue_v2} from '../src/theme/system/color/avatar'
export type {ThemeColorBadge_v2, ThemeColorBadgeTone_v2} from '../src/theme/system/color/badge'
export type {
  ThemeColorButton_v2,
  ThemeColorButtonMode_v2,
  ThemeColorButtonTone_v2,
} from '../src/theme/system/color/button'
export type {
  ThemeColorCard_v2,
  ThemeColorScheme_v2,
  ThemeColorSchemes_v2,
} from '../src/theme/system/color/color'
export type {
  ThemeColorInput_v2,
  ThemeColorInputMode_v2,
  ThemeColorInputState_v2,
} from '../src/theme/system/color/input'
export type {ThemeColorKBD} from '../src/theme/system/color/kbd'
export type {
  ThemeColorSelectable_v2,
  ThemeColorSelectableTone_v2,
} from '../src/theme/system/color/selectable'
export type {ThemeColorShadow} from '../src/theme/system/color/shadow'
export type {ThemeColorState_v2} from '../src/theme/system/color/state'
export type {ThemeColorSyntax} from '../src/theme/system/color/syntax'
export type {CSSObject} from '../src/theme/system/css'
export type {ThemeFocusRing} from '../src/theme/system/focusRing'
export type {
  ThemeFont,
  ThemeFontKey,
  ThemeFonts,
  ThemeFontSize,
  ThemeFontWeight,
  ThemeFontWeightKey,
} from '../src/theme/system/font'
export type {ThemeInput_v2} from '../src/theme/system/input'
export type {ThemeLayer} from '../src/theme/system/layer'
export type {ThemeBoxShadow, ThemeShadow} from '../src/theme/system/shadow'
export type {ThemeStyles} from '../src/theme/system/styles'
export type {BaseTheme, RootTheme, RootTheme_v2, Theme, Theme_v2} from '../src/theme/system/theme'
export type {ThemeAvatar} from '../src/theme/system/v0/avatar'
export type {ThemeColorGenericState} from '../src/theme/system/v0/color/_generic'
export type {ThemeColorName, ThemeColorToneKey} from '../src/theme/system/v0/color/_system'
export type {ThemeColorBase} from '../src/theme/system/v0/color/base'
export type {
  ThemeColorButton,
  ThemeColorButtonState,
  ThemeColorButtonStates,
  ThemeColorButtonTones,
} from '../src/theme/system/v0/color/button'
export type {ThemeColorCard, ThemeColorCardState} from '../src/theme/system/v0/color/card'
export type {
  ThemeColor,
  ThemeColorScheme,
  ThemeColorSchemes,
} from '../src/theme/system/v0/color/color'
export type {
  ThemeColorInput,
  ThemeColorInputState,
  ThemeColorInputStates,
} from '../src/theme/system/v0/color/input'
export type {ThemeColorMuted, ThemeColorMutedTone} from '../src/theme/system/v0/color/muted'
export type {
  ThemeColorSelectable,
  ThemeColorSelectableState,
  ThemeColorSelectableStates,
} from '../src/theme/system/v0/color/selectable'
export type {ThemeColorSolid, ThemeColorSolidTone} from '../src/theme/system/v0/color/solid'
export type {ThemeColorSpot, ThemeColorSpotKey} from '../src/theme/system/v0/color/spot'
export type {ThemeInput} from '../src/theme/system/v0/input'
export {getTheme_v2} from '../src/theme/versioning/getTheme_v2'
export {is_v0} from '../src/theme/versioning/is_v0'
export {is_v2} from '../src/theme/versioning/is_v2'
export {v0_v2} from '../src/theme/versioning/v0_v2'
export {v2_v0} from '../src/theme/versioning/v2_v0'
