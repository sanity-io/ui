import React from 'react'

import {type MarginProps, marginProps} from '../../props/margin'
import {type ToneProps, toneProps} from '../../props/tone'
import {type TypographyProps, typographyProps} from '../../props/typography'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

const ICON_SIZE = [0, 1, 2, 3, 4] as const
export type IconSize = (typeof ICON_SIZE)[number]

/** @public */
export interface IconProps extends React.ComponentProps<'svg'>, MarginProps, ToneProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  size?: Responsive<IconSize>
  muted?: TypographyProps['muted']
}

export const iconProps: Record<string, PropDef> = {
  size: {
    type: 'union',
    className: 'icon-body',
    values: ICON_SIZE,
  },
  muted: typographyProps['muted'] as PropDef,
  ...toneProps,
  ...marginProps,
}
