import type {ElementTone} from '@sanity/ui/theme'

/**
 * @public
 * @deprecated Will be removed in next major version.
 */
export type BadgeMode = 'default' | 'outline'

/**
 * @public
 * @deprecated Use `BadgeTone` from `@sanity/ui/css` instead.
 */
export type BadgeTone = ElementTone

/**
 * @internal
 * @deprecated Use `BadgeStyleProps` from `@sanity/ui/css` instead.
 */
export interface BadgeStyleProps {
  $tone: BadgeTone
}
