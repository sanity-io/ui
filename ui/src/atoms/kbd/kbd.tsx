import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Box} from '../box'
import {Code} from '../code'

const Root = styled.kbd`
  display: inline-block;
  background: #eee;
  font: inherit;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px #ccc;
`

export const KBD = forwardRef((props: Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref'>, ref) => {
  const {children, ...restProps} = props

  return (
    <Root {...restProps} ref={ref as any}>
      <Box as="span" padding={1}>
        <Code as="span">{children}</Code>
      </Box>
    </Root>
  )
})

KBD.displayName = 'KBD'
