import {applyHues} from './applyHues'
import {createTheme} from './createTheme'
import {Hues, LegacyTheme} from './types'

/**
 * The hues of the default Studio theme — the same `hues` export that
 * `https://themer.sanity.build/api/hues` served without any parameters.
 *
 * @public
 */
export const hues: Hues = applyHues({})

/**
 * The default Studio theme — the same `theme` export that
 * `https://themer.sanity.build/api/hues` served without any parameters.
 *
 * @public
 */
export const theme: LegacyTheme = createTheme(hues)
