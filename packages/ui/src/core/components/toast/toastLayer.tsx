import {styled} from 'styled-components'

import {Grid} from '../../primitives/grid'
import {useLayer} from '../../utils'

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
    <StyledLayer
      forwardedAs="ul"
      data-ui="ToastProvider"
      padding={padding}
      paddingX={paddingX}
      paddingY={paddingY}
      gap={gap}
      columns={1}
      style={{zIndex}}
    >
      {children}
    </StyledLayer>
  )
}

ToastLayer.displayName = 'ToastLayer'

const StyledLayer = styled(Grid)`
  box-sizing: border-box;
  position: fixed;
  right: 0;
  bottom: 0;
  list-style: none;
  pointer-events: none;
  max-width: 420px;
  width: 100%;
`
