import {type PropDef} from '../../types/PropDef'

/** @public */
export interface IndicatorStackProps<T extends React.ElementType = 'div'> {
  /** Element to render */
  as?: T
}

export const indicatorStackProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}
