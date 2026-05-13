import React from 'react'

import {type MarginProps, marginProps} from '../../props/margin'
import {type ToneProps, toneProps} from '../../props/tone'
import {type TypographyProps, typographyProps} from '../../props/typography'
import {ICON_SIZE, type IconSize} from '../../types/Icon'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface IconProps extends React.ComponentProps<'svg'>, MarginProps, ToneProps {
  /** Icon to render */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  /** CSS **font-size** property */
  size?: Responsive<IconSize>
  /** CSS **color** property */
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
