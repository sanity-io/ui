import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {useLayer} from './hooks'
import {LayerProvider} from './provider'

interface LayerProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  depth?: number
}

const Root = styled.div<{depth: number}>`
  position: relative;
`

export const Layer = forwardRef(
  ({depth, ...restProps}: LayerProps & React.HTMLProps<HTMLDivElement>, ref) => {
    return (
      <LayerProvider baseDepth={depth} id={restProps.id}>
        <LayerChildren {...restProps} ref={ref} />
      </LayerProvider>
    )
  }
)

Layer.displayName = 'Layer'

const LayerChildren = forwardRef(
  ({children, style = {}, ...restProps}: LayerProps & React.HTMLProps<HTMLDivElement>, ref) => {
    const layer = useLayer() || {depth: 0}

    return (
      <Root data-ui="Layer" {...restProps} ref={ref} style={{...style, zIndex: layer.depth}}>
        {children}
      </Root>
    )
  }
)

LayerChildren.displayName = 'LayerChildren'
