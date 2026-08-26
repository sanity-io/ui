import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface TooltipProps
  extends Omit<React.ComponentProps<'div'>, 'children' | 'content'>, PlacementProps {
  /**
   * Shared anchor identifier. Accepts any string value.
   * @remarks Set the same value on a Tooltip and a Popover to point both at one trigger.
   */
  anchorName?: React.ReactNode
  /**
   * The trigger element. Accepts a single React element that renders a `<button>` or an `<a href>`.
   * @remarks Tooltip clones it to attach `aria-describedby` and the `interestfor` attribute that opens the label.
   */
  children: React.ReactElement<Record<string, unknown>>
  /**
   * The tooltip label. Accepts any React node.
   */
  content?: React.ReactNode
  /**
   * Renders the label into `document.body` through a React portal instead of inline. Accepts Boolean value.
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
