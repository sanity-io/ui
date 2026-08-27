import {type PropDef} from '../../types/PropDef'

/** @public */
export interface VisuallyHiddenProps<T extends React.ElementType = 'span'> {
  /**
   * HTML element to render.
   */
  as?: T
  /**
   * If true, the element becomes visible on `:focus-visible`.
   */
  visibleOnFocus?: boolean
}

export const visuallyHiddenProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  visibleOnFocus: {
    type: 'boolean',
    className: 'sui-visually-hidden-visible',
  },
}
