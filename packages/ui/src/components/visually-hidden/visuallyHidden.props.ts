import {type PropDef} from '../../types/PropDef'

/** @public */
export interface VisuallyHiddenProps<T extends React.ElementType = 'span'> {
  /** Element to render */
  as?: T
  /** If true, element is visible on :focus-visible */
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
