import {_omitExactKeys, type ExactKeyTuple} from '../../lib/props/_keys'
import type {MaxWidth} from '../../props/maxWidth/types'
import type {ResponsiveProp} from '../../types'
import {BOX_STYLE_PROP_KEYS, type BoxStyleProps} from '../box/types'

/** @public */
export type ContainerStyleProps = Omit<BoxStyleProps, 'maxWidth' | 'width'> & {
  width?: ResponsiveProp<MaxWidth>
}

/** @internal */
export const CONTAINER_STYLE_PROP_KEYS = [
  ..._omitExactKeys(BOX_STYLE_PROP_KEYS, ['maxWidth', 'width']),
  'width',
] as const

// assert exact keys
CONTAINER_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  ContainerStyleProps,
  typeof CONTAINER_STYLE_PROP_KEYS
>
