import type {ExactKeyTuple} from '../../lib/props/_keys'

/** @public */
export interface HotkeysStyleProps {
  className?: string
}

/** @internal */
export const HOTKEYS_STYLE_PROP_KEYS = ['className'] as const

// assert exact keys
HOTKEYS_STYLE_PROP_KEYS satisfies ExactKeyTuple<HotkeysStyleProps, typeof HOTKEYS_STYLE_PROP_KEYS>
