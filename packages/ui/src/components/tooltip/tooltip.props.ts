import type {ComponentProps, ReactElement, ReactNode} from 'react'

import {type PlacementProps, placementProps} from '../../props/placement'
import type {PropDef} from '../../types/PropDef'

/** @beta */
export interface TooltipProps
  extends Omit<ComponentProps<'div'>, 'children' | 'content'>, PlacementProps {
  /**
   * Shared anchor identifier.
   */
  anchorName?: ReactNode
  /**
   * The trigger element.
   */
  children: ReactElement<Record<string, unknown>>
  /**
   * The tooltip label.
   */
  content?: ReactNode
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
