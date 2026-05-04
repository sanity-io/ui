import React from 'react'

import {type MarginProps, marginProps} from '../../props/margin'
import {type ToneProps} from '../../props/tone'
import {type PropDef} from '../../types/PropDef'

const ICON_SIZE = ['sm', 'md', 'lg'] as const
export type IconSize = (typeof ICON_SIZE)[number]

/** @public */
export interface IconProps extends MarginProps, ToneProps {
  as?: React.ElementType
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  size?: IconSize
}

export const iconProps: Record<string, PropDef> = {
  as: {type: 'string'},
  ...marginProps,
}
