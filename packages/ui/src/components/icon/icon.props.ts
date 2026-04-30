import {type PropDef} from '../../types/PropDef'
import {TONE, type Tone} from '../../types/Tone'

const ICON_SIZE = ['sm', 'md', 'lg'] as const
export type IconSize = (typeof ICON_SIZE)[number]

/** @public */
export interface IconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  size?: IconSize
  tone?: Tone
}

export const iconProps: Record<string, PropDef> = {
  size: {
    type: 'union',
    className: 'icon-size',
    values: ICON_SIZE,
  },
  tone: {
    type: 'union',
    className: 'tone',
    values: TONE,
  },
}
