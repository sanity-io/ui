import {FORM_ELEMENT_DENSITY, type FormElementDensity} from '../../types/FormElement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export type SelectProps = React.ComponentProps<'select'> & {
  /**
   * Sets padding on the select element.
   */
  density?: FormElementDensity
  /**
   * Disables the select element, blocking interactions and hiding it from screen readers.
   */
  disabled?: boolean
  /**
   * Used to trigger styling for invalid states.
   */
  hasError?: boolean
}

export const selectProps: Record<string, PropDef> = {
  density: {
    type: 'union',
    values: FORM_ELEMENT_DENSITY,
  },
  disabled: {
    type: 'boolean',
  },
  hasError: {
    type: 'boolean',
  },
}
