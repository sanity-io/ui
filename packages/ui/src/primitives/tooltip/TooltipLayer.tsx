import type {Placement} from '../../core/types'
import type {LayerOwnProps, LayerProps} from '../layer/Layer'

/** @internal */
export const DEFAULT_TOOLTIP_LAYER_ELEMENT = 'div'

/** @internal */
export interface TooltipLayerOwnProps extends LayerOwnProps {
  animate?: boolean
  originX?: number
  originY?: number
  placement?: Placement
}

/** @internal */
export type TooltipLayerProps = TooltipLayerOwnProps & LayerProps<'div'>
