import type {AvatarColor, AvatarSize} from '@sanity/ui/theme'

export {
  /** @deprecated Use `AvatarSize` from `@sanity/ui/theme' instead. */
  type AvatarSize,
} from '@sanity/ui/theme'

/** @public */
export type AvatarPosition = 'top' | 'bottom' | 'inside'

/** @public */
// export type AvatarSize = 0 | 1 | 2 | 3

/**
 * @public
 * @deprecated Will be removed in next major version.
 */
export type AvatarStatus = 'online' | 'editing' | 'inactive'

/**
 * @internal
 * @deprecated This will be removed in next major version.
 */
export interface AvatarRootStyleProps {
  $color: AvatarColor
}

/**
 * @internal
 * @deprecated This will be removed in next major version.
 */
export interface ResponsiveAvatarSizeStyleProps {
  $size: AvatarSize[]
}
