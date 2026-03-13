import {_omitExactKeys, type ExactKeyTuple} from '../../lib/props/_keys'
import {BOX_STYLE_PROP_KEYS, type BoxStyleProps} from '../box/types'

/** @public */
export interface StackStyleProps extends Omit<
  BoxStyleProps,
  | 'alignItems'
  | 'direction'
  | 'display'
  | 'flexDirection'
  | 'flexWrap'
  | 'gapX'
  | 'gapY'
  | 'gridAutoRows'
  | 'gridTemplateColumns'
  | 'gridTemplateRows'
  | 'justifyContent'
> {
  className?: string
}

/** @internal */
export const STACK_STYLE_PROP_KEYS = [
  ..._omitExactKeys(BOX_STYLE_PROP_KEYS, [
    'alignItems',
    'display',
    'flexDirection',
    'flexWrap',
    'gapX',
    'gapY',
    'gridAutoRows',
    'gridTemplateColumns',
    'gridTemplateRows',
    'justifyContent',
  ]),
]

// assert exact keys
STACK_STYLE_PROP_KEYS satisfies ExactKeyTuple<StackStyleProps, typeof STACK_STYLE_PROP_KEYS>
