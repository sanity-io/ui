import {Grid} from '../../primitives/grid/grid'
import {useLayer} from '../../utils/layer/useLayer'

import {toastLayer} from './toastLayer.css'

/**
 * @public
 */
export interface ToastLayerProps {
  children: React.ReactNode
  padding?: number | number[]
  paddingX?: number | number[]
  paddingY?: number | number[]
  gap?: number | number[]
}

/**
 * @internal
 */
export function ToastLayer(props: ToastLayerProps): React.JSX.Element {
  const {children, padding = 4, paddingX, paddingY, gap = 3} = props
  const {zIndex} = useLayer()

  return (
    <Grid
      as="ul"
      className={toastLayer}
      data-ui="ToastProvider"
      padding={padding}
      paddingX={paddingX}
      paddingY={paddingY}
      gap={gap}
      gridTemplateColumns={1}
      style={{zIndex}}
    >
      {children}
    </Grid>
  )
}
