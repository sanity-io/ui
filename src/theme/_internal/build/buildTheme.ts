import {ThemeConfig} from '../config'
import {TMP_Theme} from '../types'
import {buildColorTheme} from './colorTheme/buildColorTheme'
import {renderColorTheme} from './colorTheme/renderColorTheme'
import {resolveColorTokens} from './colorTheme/resolveColorTokens'
import {defaultColorPalette} from './defaults/colorPalette'
import {defaultColorTokens} from './defaults/colorTokens'

/** @internal */
export function buildTheme(config?: ThemeConfig): TMP_Theme {
  const colorTokens = resolveColorTokens(config?.color?.tokens ?? defaultColorTokens)

  return {
    color: renderColorTheme(config?.color?.palette ?? defaultColorPalette, {
      light: buildColorTheme(
        {scheme: 'light'},
        {...config, color: {...config?.color, tokens: colorTokens}},
      ),
      dark: buildColorTheme(
        {scheme: 'dark'},
        {...config, color: {...config?.color, tokens: colorTokens}},
      ),
    }),
  }
}
