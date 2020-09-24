import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {stackBaseStyles, stackSpaceStyles} from './styles'

interface StackProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  space?: number | number[]
}

const Root = styled.div(stackBaseStyles, stackSpaceStyles)

export const Stack = forwardRef((props: React.HTMLProps<HTMLDivElement> & StackProps, ref) => {
  const {space: spaceProp, ...restProps} = props
  const space = getResponsiveProp(spaceProp, [])

  return <Root data-ui="Stack" {...restProps} ref={ref} space={space} />
})

Stack.displayName = 'Stack'
