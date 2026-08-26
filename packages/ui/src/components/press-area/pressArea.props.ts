import type {InteractiveAs} from '../../types/Interactive'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface PressAreaProps<T extends React.ElementType = 'button'> {
  /**
   * Element or component to render.
   */
  as?: InteractiveAs<T>
}

export const pressAreaProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}
