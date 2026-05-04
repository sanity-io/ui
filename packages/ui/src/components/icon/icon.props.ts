import React from 'react'

import {type MarginProps, marginProps} from '../../props/margin'
import {type ToneProps} from '../../props/tone'
import {type PropDef} from '../../types/PropDef'

const ICON_SIZE = [0, 1, 2, 3, 4] as const
export type IconSize = (typeof ICON_SIZE)[number]

/** @public */
export interface IconProps extends MarginProps, ToneProps {
  as?: React.ElementType
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  muted?: boolean
  size?: IconSize
}

export const iconProps: Record<string, PropDef> = {
  as: {type: 'string'},
  muted: {type: 'boolean', className: 'text-muted', inverse: 'text-default'},
  ...marginProps,
}
