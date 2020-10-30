import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {flexItem, FlexItemProps, margin, MarginProps, padding, PaddingProps} from '../../styles'
import {box} from './styles'

export interface BoxProps extends MarginProps, PaddingProps, FlexItemProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<MarginProps & PaddingProps & FlexItemProps>(flexItem, margin, padding, box)

export const Box = forwardRef((props: React.HTMLProps<HTMLDivElement> & BoxProps, ref) => {
  const {as: asProp = 'div', margin = 0, padding = 0, ...restProps} = props

  return (
    <Root data-ui="Box" {...restProps} as={asProp} margin={margin} padding={padding} ref={ref}>
      {props.children}
    </Root>
  )
})

Box.displayName = 'Box'
