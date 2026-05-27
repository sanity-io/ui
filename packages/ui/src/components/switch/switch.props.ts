import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface SwitchProps extends React.ComponentProps<'input'>, MarginProps {
  /** Input label */
  label: React.ReactNode
  /** Indeterminate state */
  indeterminate?: boolean
}

export const switchProps: Record<string, PropDef> = {
  label: {
    type: 'string',
  },
  indeterminate: {
    type: 'boolean',
  },
  ...marginProps,
}
