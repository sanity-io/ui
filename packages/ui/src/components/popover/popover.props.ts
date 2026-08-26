import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface PopoverProps
  extends Omit<React.ComponentProps<'div'>, 'children' | 'content'>, PlacementProps {
  /**
   * Shared anchor identifier. Accepts any string value.
   * @remarks Set the same value on a Tooltip and a Popover to point both at one trigger.
   */
  anchorName?: React.ReactNode
  /**
   * The trigger element. Accepts a single React element that renders a `<button>`.
   * @remarks Popover clones it and attaches the `popovertarget` attribute that opens the floating layer.
   */
  children: React.ReactElement<Record<string, unknown>>
  /**
   * The floating content. Accepts any React node.
   */
  content?: React.ReactNode
  /**
   * Renders the content into `document.body` through a React portal instead of inline. Accepts Boolean value.
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
