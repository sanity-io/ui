import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface RadioProps extends React.ComponentProps<'input'>, MarginProps {
  /** Disabled state */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Input label */
  label: React.ReactNode
}

export const radioProps: Record<string, PropDef> = {
  disabled: {
    type: 'boolean',
  },
  error: {
    type: 'boolean',
  },
  label: {
    type: 'string',
  },
  ...marginProps,
}
