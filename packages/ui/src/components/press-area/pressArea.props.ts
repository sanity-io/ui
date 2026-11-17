import type {ElementType} from 'react'

import type {InteractiveAs} from '../../types/Interactive'
import type {Polymorphic} from '../../types/Polymorphic'
import type {PropDef} from '../../types/PropDef'

/** @public */
export type PressAreaProps<T extends ElementType = 'button'> = Polymorphic<
  T,
  {
    /**
     * Element or component to render.
     */
    as?: InteractiveAs<T>
  }
>

export const pressAreaProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}
