import type {SVGProps} from 'react'
import type React from 'react'

import {type PropDef} from '../../types/PropDef'
import {type ButtonProps, buttonProps} from '../button/button.props'

/** @public */
export interface IconButtonProps<T extends React.ElementType = 'button'> extends Pick<
  ButtonProps<T>,
  'as' | 'density' | 'level' | 'loading' | 'tone'
> {
  /**
   * Accessible name for the button.
   * @remarks Because IconButtons have no visible text, this is required.
   */
  'aria-label': string
  /**
   * Icon to render.
   */
  'icon': React.ComponentType<SVGProps<SVGSVGElement>>
}

export const iconButtonProps: Record<string, PropDef> = {
  'aria-label': {
    type: 'string',
  },
  'as': buttonProps['as'] as PropDef,
  'icon': {
    type: 'string',
  },
}
