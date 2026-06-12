import type {Strategy} from '@floating-ui/react-dom'
import type {HTMLMotionProps} from 'motion/react'

import type {Assign} from '../../core/types'
import type {LayerOwnProps} from '../layer/Layer'

/** @internal */
export interface PopoverLayerOwnProps extends LayerOwnProps {
  /**
   * Whether the popover should animate in and out.
   *
   * @beta
   * @defaultValue false
   */
  animate?: boolean
  children?: React.ReactNode
  originX?: number
  originY?: number
  referenceWidth?: number
  strategy?: Strategy
  x?: number
  y?: number
}

/** @public */
export type PopoverLayerProps = Assign<HTMLMotionProps<'div'>, PopoverLayerOwnProps>
