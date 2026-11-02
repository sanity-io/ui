import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface SwitchProps extends React.ComponentProps<'input'> {
  /**
   * Applies error styling to the switch track.
   * @remarks Use when form validation fails. Pair with a visible error message. The prop is visual only.
   */
  hasError?: boolean
}

export const switchProps: Record<string, PropDef> = {
  hasError: {
    type: 'boolean',
  },
}
