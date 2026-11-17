import type {ElementType} from 'react'

import type {Polymorphic} from '../../types/Polymorphic'
import type {PropDef} from '../../types/PropDef'

/** @public */
export type VisuallyHiddenProps<T extends ElementType = 'span'> = Polymorphic<
  T,
  {
    /**
     * HTML element to render.
     */
    as?: T
    /**
     * If true, the element becomes visible on `:focus-visible`.
     */
    visibleOnFocus?: boolean
  }
>

export const visuallyHiddenProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  visibleOnFocus: {
    type: 'boolean',
    className: 'sui-visually-hidden-visible',
  },
}
