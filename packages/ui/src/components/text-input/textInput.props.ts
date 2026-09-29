import {formElementDensityProps, type FormElementDensityProps} from '../../props/formElement'
import {type PropDef} from '../../types/PropDef'

export const TEXT_INPUT_TYPE = [
  'text',
  'date',
  'email',
  'month',
  'number',
  'password',
  'tel',
  'time',
  'url',
  'week',
] as const

/** @public */
export type TextInputType = (typeof TEXT_INPUT_TYPE)[number]

/** @public */
export interface TextInputProps
  extends Omit<React.ComponentProps<'input'>, 'type'>, FormElementDensityProps {
  /**
   * Used to trigger styling for invalid states.
   */
  hasError?: boolean
  /**
   * Subset of the html `type` attribute, filtered to text based types
   */
  type?: TextInputType
}

export const textInputProps: Record<string, PropDef> = {
  hasError: {
    type: 'boolean',
  },
  ...formElementDensityProps,
}
