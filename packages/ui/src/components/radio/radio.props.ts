import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface RadioProps extends React.ComponentProps<'input'>, MarginProps {
  /** Input label */
  label: React.ReactNode
}

export const radioProps: Record<string, PropDef> = {
  label: {
    type: 'string',
  },
  ...marginProps,
}
