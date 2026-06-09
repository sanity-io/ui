import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface LabelProps extends React.ComponentProps<'label'>, MarginProps {
  /** Element to render */
  disabled?: boolean
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
