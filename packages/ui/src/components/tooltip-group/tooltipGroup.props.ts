import type {ElementType} from 'react'

import type {Polymorphic} from '../../types/Polymorphic'
import type {PropDef} from '../../types/PropDef'

/** @public */
export type TooltipGroupProps<T extends ElementType = 'div'> = Polymorphic<
  T,
  {
    /**
     * HTML element to render.
     */
    as?: T
  }
>

export const tooltipGroupProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}
