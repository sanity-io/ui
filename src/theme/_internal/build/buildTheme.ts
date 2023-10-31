import {ThemeConfig} from '../config'
import {TMP_Theme} from '../types'
import {buildColorTheme} from './colorTheme/buildColorTheme'
import {renderColorTheme} from './colorTheme/renderColorTheme'
import {defaultColorPalette} from './defaults/colorPalette'

/** @internal */
export function buildTheme(config?: ThemeConfig): TMP_Theme {
  return {
    color: renderColorTheme(config?.color?.palette ?? defaultColorPalette, {
      light: buildColorTheme({scheme: 'light'}, config),
      dark: buildColorTheme({scheme: 'dark'}, config),
    }),
  }
}
