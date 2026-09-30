import {formElementDensityProps, type FormElementDensityProps} from '../../props/formElement'
import {type PropDef} from '../../types/PropDef'

export const TEXT_INPUT_EXCLUDED_TYPES = [
  'button',
  'checkbox',
  'color',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit',
] as const

/** @public */
export type TextInputExcludedTypes = (typeof TEXT_INPUT_EXCLUDED_TYPES)[number]

/** @public */
export type TextInputType = Exclude<React.HTMLInputTypeAttribute, TextInputExcludedTypes>

/** @public */
export interface TextInputProps
  extends Omit<React.ComponentProps<'input'>, 'type'>, FormElementDensityProps {
  /**
   * Used to trigger styling for invalid states.
   */
  hasError?: boolean
  /**
   * The html `type` attribute, with non-text based types excluded.
   */
  type?: TextInputType
}

export const textInputProps: Record<string, PropDef> = {
  hasError: {
    type: 'boolean',
  },
  ...formElementDensityProps,
}
