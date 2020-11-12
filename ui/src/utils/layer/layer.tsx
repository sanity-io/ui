import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {useLayer} from './hooks'
import {LayerProvider} from './provider'

interface LayerProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<{depth: number}>`
  position: relative;
`

export const Layer = forwardRef((props: LayerProps & React.HTMLProps<HTMLDivElement>, ref) => {
  return (
    <LayerProvider id={props.id}>
      <LayerChildren {...props} ref={ref} />
    </LayerProvider>
  )
})

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
