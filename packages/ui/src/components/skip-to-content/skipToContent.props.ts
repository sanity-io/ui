import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface SkipToContentProps extends React.ComponentProps<'a'> {
  /**
   * Same-page fragment to jump to.
   * @remarks Note: The hash character # is required for proper linking.
   */
  href: string
  /**
   * Visible and announced text.
   */
  label: string
  /**
   * Not accepted.
   * @remarks Pass text via `label`.
   */
  children?: never
}

export const skipToContentProps: Record<string, PropDef> = {
  label: {
    type: 'string',
  },
}
