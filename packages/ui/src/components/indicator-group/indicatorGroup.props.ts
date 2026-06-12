import {type PropDef} from '../../types/PropDef'

/** @public */
export interface IndicatorGroupProps<T extends React.ElementType> {
  /** Element to render */
  as?: T
}

export const indicatorGroupProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}
