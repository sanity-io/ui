import {type PropDef} from '../../types/PropDef'

/** @public */
export interface TooltipGroupProps<T extends React.ElementType = 'div'> {
  /** Element to render */
  as?: T
}

export const tooltipGroupProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}
