import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface LabelProps extends React.ComponentProps<'label'>, MarginProps {
  /**
   * Renders the label in a muted color. Accepts Boolean value.
   */
  disabled?: boolean
  /**
   * Renders the label in the error color. Accepts Boolean value.
   * @remarks Use when the linked input has a validation error.
   */
  error?: boolean
}

export const labelProps: Record<string, PropDef> = {
  disabled: {
    type: 'boolean',
  },
  error: {
    type: 'boolean',
  },
  ...marginProps,
}
