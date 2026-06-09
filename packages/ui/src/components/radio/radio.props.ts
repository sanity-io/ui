import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface RadioProps extends React.ComponentProps<'input'>, MarginProps {
  /** Error state */
  error?: boolean
  /** Input label */
  label: React.ReactNode
}

export const radioProps: Record<string, PropDef> = {
  error: {
    type: 'boolean',
  },
  label: {
    type: 'string',
  },
  ...marginProps,
}
