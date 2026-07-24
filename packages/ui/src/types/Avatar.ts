export const AVATAR_SIZE = [0, 1, 2] as const
export type AvatarSize = (typeof AVATAR_SIZE)[number]

export const AVATAR_COLOR = [
  'gray',
  'blue',
  'purple',
  'magenta',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
] as const
export type AvatarColor = (typeof AVATAR_COLOR)[number]
