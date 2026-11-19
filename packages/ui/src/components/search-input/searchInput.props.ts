import {formElementDensityProps, type FormElementDensityProps} from '../../props/formElement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface SearchInputProps
  extends FormElementDensityProps, Omit<React.ComponentProps<'input'>, 'type'> {}

export const searchInputProps: Record<string, PropDef> = {
  ...formElementDensityProps,
}
