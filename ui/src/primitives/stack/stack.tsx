import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {stackBaseStyle, responsiveStackSpaceStyle, ResponsiveStackSpaceStyleProps} from './styles'

interface StackProps extends ResponsiveStackSpaceStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div<ResponsiveStackSpaceStyleProps>(stackBaseStyle, responsiveStackSpaceStyle)

export const Stack = forwardRef((props: StackProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {space, ...restProps} = props

  return <Root data-ui="Stack" {...restProps} ref={ref} space={space} />
})

Stack.displayName = 'Stack'
