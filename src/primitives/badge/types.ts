export type BadgeMode = 'default' | 'outline'
export type BadgeTone = 'default' | 'primary' | 'positive' | 'caution' | 'critical'

export interface BadgeStyleProps {
  $mode: BadgeMode
  $tone: BadgeTone
}
