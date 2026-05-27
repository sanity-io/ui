import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface CheckboxProps extends React.ComponentProps<'input'>, MarginProps {
  /** Input label */
  label: React.ReactNode
  /** Indeterminate state */
  indeterminate?: boolean
}

export const checkboxProps: Record<string, PropDef> = {
  label: {
    type: 'string',
  },
  indeterminate: {
    type: 'boolean',
  },
  ...marginProps,
}
