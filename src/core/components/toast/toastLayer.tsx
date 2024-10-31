import {GapStyleProps, PaddingStyleProps, toastLayer} from '@sanity/ui/css'
import {ReactNode} from 'react'

import {Grid} from '../../primitives/grid'
import {useLayer} from '../../utils'

/**
 * @public
 */
export interface ToastLayerProps extends GapStyleProps, PaddingStyleProps {
  children: ReactNode
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
      className={toastLayer()}
      data-ui="ToastProvider"
      padding={padding}
      paddingX={paddingX}
      paddingY={paddingY}
      gap={gap}
      columns={1}
      style={{zIndex}}
    >
      {children}
    </Grid>
  )
}

ToastLayer.displayName = 'ToastLayer'
