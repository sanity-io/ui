import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface SwitchProps extends React.ComponentProps<'input'>, MarginProps {
  /**
   * Applies error styling to the switch track.
   * @remarks Use when form validation fails. Pair with a visible error message. The prop is visual only.
   */
  error?: boolean
  /**
   * Visible label next to the switch.
   */
  label: React.ReactNode
}

export const switchProps: Record<string, PropDef> = {
  error: {
    type: 'boolean',
  },
  label: {
    type: 'string',
  },
  ...marginProps,
}
