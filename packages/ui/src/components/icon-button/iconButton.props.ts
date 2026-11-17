import type {ComponentType, ElementType, SVGProps} from 'react'

import type {Polymorphic} from '../../types/Polymorphic'
import type {PropDef} from '../../types/PropDef'
import {type ButtonProps, buttonProps} from '../button/button.props'

/** @public */
export type IconButtonProps<T extends ElementType = 'button'> = Polymorphic<
  T,
  Pick<ButtonProps<T>, 'as' | 'density' | 'level' | 'loading' | 'tone'> & {
    /**
     * Accessible name for the button.
     * @remarks Because IconButtons have no visible text, this is required.
     */
    'aria-label': string
    /**
     * Icon to render.
     */
    'icon': ComponentType<SVGProps<SVGSVGElement>>
  }
>

export const iconButtonProps: Record<string, PropDef> = {
  'aria-label': {
    type: 'string',
  },
  'as': buttonProps['as'] as PropDef,
  'icon': {
    type: 'string',
  },
}
