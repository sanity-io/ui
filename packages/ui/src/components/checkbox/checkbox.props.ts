import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface CheckboxProps extends React.ComponentProps<'input'>, MarginProps {
  /**
   * Applies error styling to the checkbox mark.
   * @remarks Use when form validation fails. Pair with a visible error message. The prop is visual only.
   */
  error?: boolean
  /**
   * Renders the "mixed state" mark (a horizontal line).
   * @remarks Use when the checkbox controls a group with some-but-not-all children checked.
   */
  indeterminate?: boolean
  /**
   * Visible label next to the checkbox.
   */
  label: React.ReactNode
}

export const checkboxProps: Record<string, PropDef> = {
  error: {
    type: 'boolean',
  },
  indeterminate: {
    type: 'boolean',
  },
  label: {
    type: 'string',
  },
  ...marginProps,
}
