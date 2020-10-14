import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Box} from '../box'
import {Text} from '../text'

const Root = styled.div`
  display: inline-block;
  background: #eee;
`

export interface BadgeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

export const Badge = forwardRef((props: BadgeProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {children, ...restProps} = props

  return (
    <Root data-ui="Badge" {...restProps} ref={ref}>
      <Box padding={2}>
        <Text>{children}</Text>
      </Box>
    </Root>
  )
})

Badge.displayName = 'Badge'
