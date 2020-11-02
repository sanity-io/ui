import {Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const Root = styled(Flex)`
  height: 100%;
  border-left: 1px dashed var(--card-hairline-soft-color);
`

const Content = styled(Card)`
  overflow: auto;
`

export function ChangesPanel({onClose}: {onClose: () => void}) {
  return (
    <Root direction="column">
      <Card borderBottom>
        <Flex>
          <Box flex={1} padding={4}>
            <Text weight="semibold">Review changes</Text>
          </Box>
          <Box padding={2}>
            <Button icon="close" mode="bleed" onClick={onClose} />
          </Box>
        </Flex>
      </Card>
      <Content flex={1}>
        <Box paddingX={4} paddingY={5}>
          <Stack space={5}>
            <ChangeItem />
            <ChangeItem />
            <ChangeItem />
            <ChangeItem />
          </Stack>
        </Box>
      </Content>
    </Root>
  )
}

function ChangeItem() {
  return (
    <Box>
      <Stack space={3}>
        <Text size={1} weight="semibold">
          Title
        </Text>

        <Box paddingLeft={2} style={{borderLeft: '1px solid var(--card-hairline-soft-color)'}}>
          <Card padding={3} radius={2} tone="transparent">
            <Text>Diff</Text>
          </Card>
        </Box>

        <div>
          <Button
            icon="revert"
            padding={1}
            mode="bleed"
            text="Revert changes"
            tone="critical"
            size={1}
            space={2}
          />
        </div>
      </Stack>
    </Box>
  )
}
