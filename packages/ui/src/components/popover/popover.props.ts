import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface PopoverProps
  extends Omit<React.ComponentProps<'div'>, 'children' | 'content'>, PlacementProps {
  /**
   * Shared anchor identifier.
   * @remarks Set the same value on a Tooltip and a Popover to point both at one trigger.
   */
  anchorName?: React.ReactNode
  /**
   * The trigger element.
   * @remarks Popover clones it and attaches the `popovertarget` attribute that opens the floating layer.
   */
  children: React.ReactElement<Record<string, unknown>>
  /**
   * The floating content.
   */
  content?: React.ReactNode
  /**
   * Renders the content into `document.body` through a React portal instead of inline.
   */
  portal?: boolean
}

export const popoverProps: Record<string, PropDef> = {
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
