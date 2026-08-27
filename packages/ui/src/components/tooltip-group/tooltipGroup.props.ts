import {type PropDef} from '../../types/PropDef'

/** @public */
export interface TooltipGroupProps<T extends React.ElementType = 'div'> {
  /**
   * HTML element to render.
   */
  as?: T
}

export const tooltipGroupProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}
