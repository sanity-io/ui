import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface RadioProps extends React.ComponentProps<'input'> {
  /**
   * Applies error styling to the radio mark for invalid states.
   * @remarks Use when form validation fails. Pair with a visible error message.
   */
  hasError?: boolean
}

export const radioProps: Record<string, PropDef> = {
  hasError: {
    type: 'boolean',
  },
}
