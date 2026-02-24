import {_omitExactKeys, type ExactKeyTuple} from '../../_keys'
import type {AlignItems} from '../../props/alignItems/types'
import type {FlexDirection} from '../../props/flexDirection/types'
import type {FlexWrap} from '../../props/flexWrap/types'
import type {JustifyContent} from '../../props/justifyContent/types'
import type {ResponsiveProp} from '../../types'
import {BOX_STYLE_PROP_KEYS, type BoxStyleProps} from '../box/types'

/** @public */
export interface FlexStyleProps extends Omit<
  BoxStyleProps,
  'alignItems' | 'display' | 'flexDirection' | 'flexWrap'
> {
  align?: ResponsiveProp<AlignItems>
  direction?: ResponsiveProp<FlexDirection>
  justify?: ResponsiveProp<JustifyContent>
  wrap?: ResponsiveProp<FlexWrap>
}

/** @internal */
export const FLEX_STYLE_PROP_KEYS = [
  ..._omitExactKeys(BOX_STYLE_PROP_KEYS, ['alignItems', 'display', 'flexDirection', 'flexWrap']),
  'align',
  'direction',
  'justify',
  'wrap',
] as const

FLEX_STYLE_PROP_KEYS satisfies ExactKeyTuple<FlexStyleProps, typeof FLEX_STYLE_PROP_KEYS>
