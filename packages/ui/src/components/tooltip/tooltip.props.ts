import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface TooltipProps
  extends Omit<React.ComponentProps<'div'>, 'children' | 'content'>, PlacementProps {
  /**
   * Shared anchor identifier.
   */
  anchorName?: React.ReactNode
  /**
   * The trigger element.
   */
  children: React.ReactElement<Record<string, unknown>>
  /**
   * The tooltip label.
   */
  content?: React.ReactNode
  /**
   * Renders the label into `document.body` through a React portal instead of inline.
   */
  portal?: boolean
}

export const tooltipProps: Record<string, PropDef> = {
  anchorName: {
    type: 'string',
  },
  content: {
    type: 'string',
  },
  portal: {
    type: 'boolean',
  },
  ...placementProps,
}
