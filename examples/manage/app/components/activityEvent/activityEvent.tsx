import {Avatar, Box, Card, Flex, Text} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const Root = styled(Card).attrs({forwardedAs: 'a'})`
  & + & {
    border-top: 1px solid var(--card-hairline-soft-color);
  }
`

export function ActivityEvent() {
  return (
    <Root href="#" padding={4}>
      <Flex>
        <Box>
          <Avatar color="orange" size={1} />
        </Box>
        <Box flex={1} paddingX={3}>
          <Text>
            <strong>Froopy Fluffield</strong> added <strong>Boo Huskinson</strong> to the project as
            an editor
          </Text>
        </Box>
        <Box style={{width: 40, textAlign: 'right'}}>
          <Text>15m</Text>
        </Box>
      </Flex>
    </Root>
  )
}
