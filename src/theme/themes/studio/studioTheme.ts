import {buildTheme} from '../../build'
import {color} from './color'
import {config} from './config'
import {fonts} from './fonts'

/**
 * @public
 */
export const studioTheme = buildTheme({
  ...config,
  color,
  fonts,
})
