import {formElementDensityProps, type FormElementDensityProps} from '../../props/formElement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface SelectProps extends React.ComponentProps<'select'>, FormElementDensityProps {
  /**
   * Used to trigger styling for invalid states.
   * @remarks Use when form validation fails. Pair with a visible error message.
   */
  hasError?: boolean
}

export const selectProps: Record<string, PropDef> = {
  hasError: {
    type: 'boolean',
  },
  ...formElementDensityProps,
}
