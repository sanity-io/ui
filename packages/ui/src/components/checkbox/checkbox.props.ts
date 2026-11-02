import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface CheckboxProps extends React.ComponentProps<'input'> {
  /**
   * Applies error styling to the checkbox mark for invalid states.
   * @remarks Use when form validation fails. Pair with a visible error message.
   */
  hasError?: boolean
  /**
   * Renders the "mixed state" mark (a horizontal line).
   * @remarks Use when the checkbox controls a group with some-but-not-all children checked.
   */
  indeterminate?: boolean
}

export const checkboxProps: Record<string, PropDef> = {
  hasError: {
    type: 'boolean',
  },
  indeterminate: {
    type: 'boolean',
  },
}
