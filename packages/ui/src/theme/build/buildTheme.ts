import {ThemeConfig} from '../config'
import {defaultThemeConfig} from '../defaults/config'
import {defaultThemeFonts} from '../defaults/fonts'
import {RootTheme, RootTheme_v2} from '../system'
import {v2_v0} from '../versioning'
import {buildColorTheme} from './buildColorTheme'
import {renderThemeColorSchemes} from './renderColorTheme'

/** @internal */
export function buildTheme(config?: ThemeConfig): RootTheme {
  const colorTheme = buildColorTheme(config)

  const v2: RootTheme_v2 = {
    _version: 2,
    avatar: config?.avatar ?? defaultThemeConfig.avatar,
    button: config?.button ?? defaultThemeConfig.button,
    card: config?.card ?? defaultThemeConfig.card,
    // How colors are generated:
    // 1. Merge custom tokens with default tokens
    // 2. Generate tree of color keys (gray/500, black, white, etc.)
    // 3. Apply mixing and render to hex values
    // render(build(mergeWithDefaults()))
    color: renderThemeColorSchemes(colorTheme, config),
    container: config?.container ?? defaultThemeConfig.container,
    font: config?.font ?? defaultThemeFonts,
    input: config?.input ?? defaultThemeConfig.input,
    layer: config?.layer ?? defaultThemeConfig.layer,
    media: config?.media ?? defaultThemeConfig.media,
    radius: config?.radius ?? defaultThemeConfig.radius,
    shadow: config?.shadow ?? defaultThemeConfig.shadow,
    space: config?.space ?? defaultThemeConfig.space,
    style: config?.style ?? defaultThemeConfig.style,
  }

  return v2_v0(v2)
}
