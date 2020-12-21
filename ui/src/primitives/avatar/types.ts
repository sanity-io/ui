export type AvatarPosition = 'top' | 'bottom' | 'inside'
export type AvatarSize = 0 | 1 | 2
export type AvatarStatus = 'online' | 'editing' | 'inactive'

export interface AvatarRootStyleProps {
  $color: string
}

export interface ResponsiveAvatarSizeStyleProps {
  $size: AvatarSize[]
}
