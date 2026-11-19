import type {ComponentProps} from 'react'

import {formElementDensityProps, type FormElementDensityProps} from '../../props/formElement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface SearchInputProps
  extends FormElementDensityProps, Omit<ComponentProps<'input'>, 'type'> {}

export const searchInputProps: Record<string, PropDef> = {
  ...formElementDensityProps,
}
