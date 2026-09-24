import {formElementDensityProps, type FormElementDensityProps} from '../../props/formElement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export type SelectProps = React.ComponentProps<'select'> &
  FormElementDensityProps & {
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
  disabled: {
    type: 'boolean',
  },
  hasError: {
    type: 'boolean',
  },
  ...formElementDensityProps,
}
