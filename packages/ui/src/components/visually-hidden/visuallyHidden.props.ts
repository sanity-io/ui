import {type PropDef} from '../../types/PropDef'

/** @public */
export interface VisuallyHiddenProps<T extends React.ElementType> {
  /** Element to render */
  as?: T
}

export const visuallyHiddenProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}
