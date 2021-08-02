import {Button, Flex} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const StyledButton2 = styled(Button)`
  &:hover {
    background-color: red;
    box-shadow: none;
  }
`

export default function StyledButton2Story() {
  const props = {href: '#', text: 'Test'}

  // NOTE: This approach does not work with TypeScript
  return (
    <Flex align="center" height="fill" justify="center">
      <StyledButton2 forwardedAs="a" {...(props as any)} />
    </Flex>
  )
}
