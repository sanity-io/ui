import type {SVGProps} from 'react'
import type React from 'react'

import {type PropDef} from '../../types/PropDef'
import {type ButtonProps, buttonProps} from '../button/button.props'

/** @public */
export interface IconButtonProps<T extends React.ElementType = 'button'> extends Pick<
  ButtonProps<T>,
  'as' | 'density' | 'level' | 'loading' | 'tone'
> {
  /** Button label */
  'aria-label': string
  /** Icon */
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
