import {ThemeConfig} from '../config'
import {TMP_Theme} from '../types'
import {buildColorTheme} from './colorTheme/buildColorTheme'
import {renderColorTheme} from './colorTheme/renderColorTheme'

/** @internal */
export function buildTheme(config?: ThemeConfig): TMP_Theme {
  const color: TMP_Theme['color'] = {
    light: buildColorTheme({scheme: 'light'}, config),
    dark: buildColorTheme({scheme: 'dark'}, config),
  }

  return {
    color: renderColorTheme(color, config),
  }
}
