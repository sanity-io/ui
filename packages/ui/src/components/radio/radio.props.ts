import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface RadioProps extends React.ComponentProps<'input'>, MarginProps {
  /**
   * Applies error styling to the radio mark.
   * @remarks Use when form validation fails. Pair with a visible error message. The prop is visual only.
   */
  error?: boolean
  /**
   * Visible label next to the radio.
   */
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
