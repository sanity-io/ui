import {_omitExactKeys, type ExactKeyTuple} from '../../lib/props/_keys'
import {BOX_STYLE_PROP_KEYS, type BoxStyleProps} from '../box/types'

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GridStyleProps extends Omit<BoxStyleProps, 'display'> {}

/** @internal */
export const GRID_STYLE_PROP_KEYS = [..._omitExactKeys(BOX_STYLE_PROP_KEYS, ['display'])] as const

GRID_STYLE_PROP_KEYS satisfies ExactKeyTuple<GridStyleProps, typeof GRID_STYLE_PROP_KEYS>
