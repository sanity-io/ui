import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface SkipToContentProps extends React.ComponentProps<'a'> {
  /**
   * Anchor href. The target element should be focusable or have `tabindex="-1"`.
   */
  href: string
  /** Visible/announced label */
  label: string
  /** Use label instead */
  children?: never
}

export const skipToContentProps: Record<string, PropDef> = {
  label: {
    type: 'string',
  },
}
