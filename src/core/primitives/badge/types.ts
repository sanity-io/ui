import type {ThemeColorStateToneKey} from '@sanity/ui/theme'

/**
 * @public
 * @deprecated Will be removed in next major version.
 */
export type BadgeMode = 'default' | 'outline'

/** @public */
export type BadgeTone = ThemeColorStateToneKey

/**
 * @internal
 * @deprecated Will be removed in next major version.
 */
export interface BadgeStyleProps {
  $tone: BadgeTone
}
