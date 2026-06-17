import type {ComponentProps, SVGProps} from 'react'

import {type MarginProps, marginProps} from '../../props/margin'
import {type ToneProps, toneProps} from '../../props/tone'
import {type TypographyProps, typographyProps} from '../../props/typography'
import {ICON_SIZE, type IconSize} from '../../types/Icon'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface IconProps
  extends ComponentProps<'svg'>, Pick<TypographyProps, 'muted'>, MarginProps, ToneProps {
  /** Icon to render */
  icon: React.ComponentType<SVGProps<SVGSVGElement>>
  /** CSS **font-size** property */
  size?: Responsive<IconSize>
}

export const iconProps: Record<string, PropDef> = {
  icon: {
    type: 'string',
  },
  size: {
    type: 'union',
    className: 'icon-body',
    values: ICON_SIZE,
  },
  muted: typographyProps['muted'] as PropDef,
  ...toneProps,
  ...marginProps,
}
