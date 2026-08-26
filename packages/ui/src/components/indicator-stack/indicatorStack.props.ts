import {type PropDef} from '../../types/PropDef'

/** @public */
export interface IndicatorStackProps<T extends React.ElementType = 'div'> {
  /**
   * HTML element to render. Accepts any valid HTML tag.
   */
  as?: T
}

export const indicatorStackProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}
