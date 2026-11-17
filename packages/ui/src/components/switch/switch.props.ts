import type {ComponentProps} from 'react'

import type {PropDef} from '../../types/PropDef'

/** @beta */
export interface SwitchProps extends ComponentProps<'input'> {
  /**
   * Applies error styling to the switch track for invalid states.
   * @remarks Use when form validation fails. Pair with a visible error message.
   */
  hasError?: boolean
}

export const switchProps: Record<string, PropDef> = {
  hasError: {
    type: 'boolean',
  },
}
