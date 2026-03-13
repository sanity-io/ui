import {_omitExactKeys, type ExactKeyTuple} from '../../lib/props/_keys'
import {BOX_STYLE_PROP_KEYS, type BoxStyleProps} from '../box/types'

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InlineStyleProps extends Omit<
  BoxStyleProps,
  | 'display'
  | 'alignItems'
  | 'flexDirection'
  | 'flexWrap'
  | 'justifyContent'
  | 'gridAutoColumns'
  | 'gridAutoFlow'
  | 'gridAutoRows'
  | 'gridColumnEnd'
  | 'gridColumnStart'
  | 'gridColumn'
  | 'gridRowEnd'
  | 'gridRowStart'
  | 'gridRow'
  | 'gridTemplateColumns'
  | 'gridTemplateRows'
> {}

/** @internal */
export const INLINE_STYLE_PROP_KEYS = [
  ..._omitExactKeys(BOX_STYLE_PROP_KEYS, [
    'display',
    'alignItems',
    'flexDirection',
    'flexWrap',
    'justifyContent',
    'gridAutoColumns',
    'gridAutoFlow',
    'gridAutoRows',
    'gridColumnEnd',
    'gridColumnStart',
    'gridColumn',
    'gridRowEnd',
    'gridRowStart',
    'gridRow',
    'gridTemplateColumns',
    'gridTemplateRows',
  ]),
] as const

INLINE_STYLE_PROP_KEYS satisfies ExactKeyTuple<InlineStyleProps, typeof INLINE_STYLE_PROP_KEYS>
