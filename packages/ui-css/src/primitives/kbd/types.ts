import type {ExactKeyTuple} from '../../_keys'

/** @public */
export interface KBDStyleProps {
  className?: string
}

/** @internal */
export const KBD_STYLE_PROP_KEYS = ['className'] as const

// assert exact keys
KBD_STYLE_PROP_KEYS satisfies ExactKeyTuple<KBDStyleProps, typeof KBD_STYLE_PROP_KEYS>
