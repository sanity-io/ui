import {ThemeColorSchemes} from '../../lib/theme'
import {ThemeConfig} from '../config'
import {buildColorTheme, renderColorTheme} from './colorTheme'

/** @internal */
export function buildTheme(config?: ThemeConfig): {color: ThemeColorSchemes} {
  return {
    color: renderColorTheme(buildColorTheme(config), config),
  }
}
