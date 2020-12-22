import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Box, BoxProps} from '../box'
import {stackBaseStyle, responsiveStackSpaceStyle, ResponsiveStackSpaceStyleProps} from './styles'

interface StackProps extends BoxProps {
  space?: number | number[]
}

const Root = styled(Box)<ResponsiveStackSpaceStyleProps>(stackBaseStyle, responsiveStackSpaceStyle)

export const Stack = forwardRef((props: StackProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {as, space, ...restProps} = props

  return (
    <Root
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Stack"
      {...restProps}
      $space={space}
      forwardedAs={as}
      ref={ref}
    />
  )
})

Stack.displayName = 'Stack'
