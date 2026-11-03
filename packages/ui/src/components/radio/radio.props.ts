import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface RadioProps extends React.ComponentProps<'input'> {
  /**
   * Applies error styling to the radio mark.
   * @remarks Use when form validation fails. Pair with a visible error message. The prop is visual only.
   */
  hasError?: boolean
}

export const radioProps: Record<string, PropDef> = {
  hasError: {
    type: 'boolean',
  },
}
