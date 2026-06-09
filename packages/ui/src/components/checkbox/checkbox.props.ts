import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface CheckboxProps extends React.ComponentProps<'input'>, MarginProps {
  /** Error state */
  error?: boolean
  /** Indeterminate state */
  indeterminate?: boolean
  /** Input label */
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
