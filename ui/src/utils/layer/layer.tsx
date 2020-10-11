import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Portal} from '../portal'
import {useLayer} from './hooks'
import {LayerProvider} from './provider'

interface LayerProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

// @todo: move to theme object
const INITIAL_Z_INDEX = 1060

const Root = styled.div<{depth: number}>`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  z-index: ${({depth}) => INITIAL_Z_INDEX + depth};
`

export const Layer = forwardRef((props: LayerProps & React.HTMLProps<HTMLDivElement>, ref) => {
  return (
    <LayerProvider>
      <Portal>
        <LayerChildren {...props} ref={ref} />
      </Portal>
    </LayerProvider>
  )
})

Layer.displayName = 'Layer'

const LayerChildren = forwardRef(
  ({children, ...restProps}: LayerProps & React.HTMLProps<HTMLDivElement>, ref) => {
    const layer = useLayer() || {depth: 0}

    return (
      <Root {...restProps} depth={layer.depth} ref={ref as any}>
        {children}
      </Root>
    )
  }
)

LayerChildren.displayName = 'LayerChildren'
