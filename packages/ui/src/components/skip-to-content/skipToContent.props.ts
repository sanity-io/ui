import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface SkipToContentProps extends React.ComponentProps<'a'> {
  /**
   * Anchor hash. The target element should be focusable or have `tabindex="-1"` applied.
   */
  hash: string
  /** Use href instead */
  href?: never
  /** Visible/announced label */
  label: string
  /** Use label instead */
  children?: never
}

export const skipToContentProps: Record<string, PropDef> = {
  hash: {
    type: 'string',
  },
  label: {
    type: 'string',
  },
}
