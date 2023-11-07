import {buildTheme} from '../../build'
import {config} from './config'
import {fonts} from './fonts'

/**
 * @public
 */
export const studioTheme = buildTheme({...config, fonts})
