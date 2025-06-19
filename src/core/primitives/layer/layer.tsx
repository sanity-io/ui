import type {ResponsiveProp} from '@sanity/ui/css'

import type {CardElementType, CardOwnProps} from '../../primitives/card/card'
import type {Props} from '../../types'
import {LayerCard} from './layerCard'
import {LayerProvider} from './layerProvider'

/** @public */
export const DEFAULT_LAYER_ELEMENT = 'div'

/** @public */
export type LayerOwnProps = CardOwnProps & {
  /** A callback that fires when the layer becomes the top layer when it was not the top layer before. */
  onActivate?: (props: {activeElement: HTMLElement | null}) => void
  zOffset?: ResponsiveProp<number>
}

/** @public */
export type LayerElementType = CardElementType

/** @public */
export type LayerProps<E extends LayerElementType = LayerElementType> = Props<LayerOwnProps, E>

/** @public */
export function Layer<E extends LayerElementType = typeof DEFAULT_LAYER_ELEMENT>(
  props: LayerProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_LAYER_ELEMENT,
    children,
    zOffset = 1,
    ...rest
  } = props as LayerProps<typeof DEFAULT_LAYER_ELEMENT>

  return (
    <LayerProvider zOffset={zOffset}>
      <LayerCard {...rest} as={as}>
        {children}
      </LayerCard>
    </LayerProvider>
  )
}
