import {type PropDef} from '../../types/PropDef'

/** @public */
export interface VisuallyHiddenProps<T extends React.ElementType = 'span'> {
  /**
   * HTML element to render. Accepts any valid HTML tag (ex: `'span'`, `'input'`, `'label'`).
   */
  as?: T
  /**
   * If true, the element becomes visible on `:focus-visible`. Accepts Boolean value.
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
