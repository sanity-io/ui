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
   * Renders the content into a React portal instead of inline.
   * @remarks Content can be rendered into `document.body` or an optional `portalElement`
   */
  portal?: boolean
  /**
   * Element to render the portal into.
   */
  portalElement?: Element | DocumentFragment
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
  portalElement: {
    type: 'boolean',
  },
  ...placementProps,
}
